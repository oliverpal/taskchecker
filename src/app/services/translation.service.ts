import { Injectable, signal, computed } from '@angular/core';
import { Translations, SupportedLanguage } from '../models/translation.model';
import { LocalStorageService } from './local-storage.service';
import { translations } from '../i18n';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly LANGUAGE_KEY = 'tc_selectedLanguage';
  private readonly currentLanguageSignal = signal<SupportedLanguage>('en');
  public readonly currentLanguage = computed(() => this.currentLanguageSignal());

  private readonly translations: Record<SupportedLanguage, Translations> = translations;

  constructor(private readonly localStorageService: LocalStorageService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Check for saved language preference
    const savedLanguage = this.localStorageService.getItem<SupportedLanguage>(this.LANGUAGE_KEY);
    
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = this.detectBrowserLanguage();
      this.setLanguage(browserLanguage);
    }
  }

  private detectBrowserLanguage(): SupportedLanguage {
    const browserLang = navigator.language.toLowerCase();
    
    // Check if browser language starts with supported language codes
    if (browserLang.startsWith('de')) {
      return 'de';
    }
    
    // Default to English for all other cases
    return 'en';
  }

  private isValidLanguage(lang: string): lang is SupportedLanguage {
    return ['en', 'de'].includes(lang);
  }

  setLanguage(language: SupportedLanguage): void {
    this.currentLanguageSignal.set(language);
    this.localStorageService.setItem(this.LANGUAGE_KEY, language);
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguageSignal();
  }

  getTranslations(): Translations {
    return this.translations[this.getCurrentLanguage()];
  }

  translate(key: string): string {
    const translations = this.getTranslations();
    const keys = key.split('.');
    
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

  // Helper method for formatted strings
  translateWithParams(key: string, params: Record<string, string | number>): string {
    let translation = this.translate(key);
    
    Object.entries(params).forEach(([param, value]) => {
      translation = translation.replace(`{{${param}}}`, value.toString());
    });
    
    return translation;
  }
}