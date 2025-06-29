import { Component, computed, ElementRef, HostListener, inject, ViewChild, AfterViewInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { TranslationService } from '../../services/translation.service';

interface PremiumFormData {
  email: string;
  suggestions: string;
  termsAccepted: boolean;
}

type FeedbackSubmissionState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  private readonly modalService = inject(ModalService);
  private readonly translationService = inject(TranslationService);

  @ViewChild('modalContent', { static: false }) modalContent!: ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton!: ElementRef;

  private previouslyFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  public readonly modalState = this.modalService.state;
  public readonly isOpen = computed(() => this.modalState().isOpen);
  public readonly modalType = computed(() => this.modalState().type);
  public readonly modalTitle = computed(() => {
    const type = this.modalType();
    switch (type) {
      case 'imprint':
        return this.translationService.translate('modal.imprint.title');
      case 'privacy':
        return this.translationService.translate('modal.privacy.title');
      case 'premium':
        return this.translationService.translate('modal.premium.title');
      default:
        return '';
    }
  });

  // Premium form state
  public premiumFormData: PremiumFormData = {
    email: '',
    suggestions: '',
    termsAccepted: false
  };
  
  public feedbackSubmissionState: FeedbackSubmissionState = 'idle';
  public isSubmittingFeedback = computed(() => this.feedbackSubmissionState === 'submitting');

  constructor() {
    // Watch for modal state changes to manage focus
    effect(() => {
      this.manageFocus();
    });

    // Reset form when modal closes
    effect(() => {
      if (!this.isOpen()) {
        this.resetForm();
      }
    });
  }

  // Touch gesture handling for mobile
  private touchStartY = 0;
  private touchCurrentY = 0;
  private isDragging = false;

  /**
   * Close modal when clicking backdrop
   */
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.modalService.closeModal();
  }


  /**
   * Handle touch start for swipe-to-close gesture
   */
  onTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.touchStartY = event.touches[0].clientY;
      this.isDragging = true;
    }
  }

  /**
   * Handle touch move for swipe-to-close gesture
   */
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging || event.touches.length !== 1) return;
    
    this.touchCurrentY = event.touches[0].clientY;
    const deltaY = this.touchCurrentY - this.touchStartY;
    
    // Only allow downward swipes and limit the distance
    if (deltaY > 0) {
      const maxDrag = 200;
      const dragDistance = Math.min(deltaY, maxDrag);
      const modal = this.modalContent?.nativeElement;
      
      if (modal) {
        modal.style.transform = `translateY(${dragDistance}px)`;
        modal.style.opacity = `${1 - (dragDistance / maxDrag) * 0.5}`;
      }
    }
  }

  /**
   * Handle touch end for swipe-to-close gesture
   */
  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    const deltaY = this.touchCurrentY - this.touchStartY;
    const modal = this.modalContent?.nativeElement;
    
    if (modal) {
      // Reset transform
      modal.style.transform = '';
      modal.style.opacity = '';
    }
    
    // Close modal if swiped down more than 100px
    if (deltaY > 100) {
      this.closeModal();
    }
    
    this.isDragging = false;
    this.touchStartY = 0;
    this.touchCurrentY = 0;
  }

  /**
   * Get translation helper
   */
  translate(key: string): string {
    return this.translationService.translate(key);
  }

  /**
   * Focus management after view init
   */
  ngAfterViewInit(): void {
    // ViewChildren are now available
  }

  /**
   * Cleanup on destroy
   */
  ngOnDestroy(): void {
    // Restore focus to previously focused element
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }

  /**
   * Manage focus when modal opens/closes
   */
  private manageFocus(): void {
    if (this.isOpen()) {
      // Store currently focused element
      this.previouslyFocusedElement = document.activeElement as HTMLElement;
      
      // Get all focusable elements in modal
      this.updateFocusableElements();
      
      // Focus first focusable element (close button) after a brief delay
      setTimeout(() => {
        if (this.closeButton?.nativeElement) {
          this.closeButton.nativeElement.focus();
        }
      }, 100);
    } else {
      // Restore focus when modal closes
      if (this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
        this.previouslyFocusedElement = null;
      }
    }
  }

  /**
   * Update list of focusable elements
   */
  private updateFocusableElements(): void {
    if (!this.modalContent?.nativeElement) return;

    const focusableSelectors = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])'
    ];

    this.focusableElements = Array.from(
      this.modalContent.nativeElement.querySelectorAll(focusableSelectors.join(','))
    ).filter((el: any) => !el.disabled && el.offsetParent !== null) as HTMLElement[];
  }

  /**
   * Handle tab key for focus trapping
   */
  private handleTabKey(event: KeyboardEvent): void {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab: move to previous element
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: move to next element
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Enhanced keyboard event handling
   */
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'Tab':
        this.handleTabKey(event);
        break;
    }
  }

  /**
   * Reset the premium form data
   */
  private resetForm(): void {
    this.premiumFormData = {
      email: '',
      suggestions: '',
      termsAccepted: false
    };
    this.feedbackSubmissionState = 'idle';
  }

  /**
   * Submit premium feedback form
   */
  submitPremiumFeedback(): void {
    if (!this.premiumFormData.termsAccepted) {
      return;
    }

    this.feedbackSubmissionState = 'submitting';

    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      try {
        // Log form data for now (replace with actual API call)
        console.log('Premium feedback submitted:', {
          email: this.premiumFormData.email || 'Not provided',
          suggestions: this.premiumFormData.suggestions,
          timestamp: new Date().toISOString()
        });

        this.feedbackSubmissionState = 'success';
        
        // Auto-close modal after successful submission
        setTimeout(() => {
          this.closeModal();
        }, 2000);
        
      } catch (error) {
        console.error('Error submitting feedback:', error);
        this.feedbackSubmissionState = 'error';
      }
    }, 1500); // Simulate network delay
  }

  /**
   * Open terms and conditions modal (placeholder)
   */
  openTermsModal(): void {
    // For now, we'll just alert - can be enhanced to open another modal
    alert(this.translate('modal.premium.form.terms.content'));
  }
}