import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { SupportedLanguage } from '../../models/translation.model';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  private readonly translationService = inject(TranslationService);

  protected readonly currentLanguage = this.translationService.currentLanguage;

  protected switchLanguage(language: SupportedLanguage): void {
    this.translationService.setLanguage(language);
  }
}
