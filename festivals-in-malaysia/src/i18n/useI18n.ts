import { useTranslation } from "react-i18next";
import type { Language } from "../types/festival";

/**
 * Custom hook for translations with type safety
 */
export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language as Language;

  return {
    t,
    changeLanguage,
    currentLanguage,
    isReady: i18n.isInitialized,
  };
};

/**
 * Utility function to get localized text from MultiLanguageText objects
 * This is a bridge function for existing festival data structure
 */
export const getLocalizedText = (
  text: { en: string; zh: string; ms: string },
  language: Language
): string => {
  return text[language] || text.en;
};
