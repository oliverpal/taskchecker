import { SupportedLanguage, Translations } from '../models/translation.model';
import { enTranslations } from './en.translations';
import { deTranslations } from './de.translations';

export const translations: Record<SupportedLanguage, Translations> = {
  en: enTranslations,
  de: deTranslations
};

export { enTranslations, deTranslations };