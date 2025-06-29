import { Injectable, signal } from '@angular/core';

export type ModalType = 'imprint' | 'privacy' | 'premium';

export interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly modalState = signal<ModalState>({
    isOpen: false,
    type: null
  });

  public readonly state = this.modalState.asReadonly();

  /**
   * Opens a modal of the specified type
   */
  openModal(type: ModalType): void {
    this.modalState.set({
      isOpen: true,
      type
    });
    
    // Prevent body scroll when modal is open (mobile optimization)
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the currently open modal
   */
  closeModal(): void {
    this.modalState.set({
      isOpen: false,
      type: null
    });
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Toggles a modal - closes if same type is open, opens if different or closed
   */
  toggleModal(type: ModalType): void {
    const currentState = this.modalState();
    
    if (currentState.isOpen && currentState.type === type) {
      this.closeModal();
    } else {
      this.openModal(type);
    }
  }
}