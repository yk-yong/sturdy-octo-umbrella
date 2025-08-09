import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslations from "./locales/en.json";
import msTranslations from "./locales/ms.json";
import zhTranslations from "./locales/zh.json";

// Language resources
const resources = {
  en: {
    translation: enTranslations,
  },
  ms: {
    translation: msTranslations,
  },
  zh: {
    translation: zhTranslations,
  },
};

// Language configurations
export const supportedLanguages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "ms",
    name: "Bahasa Malaysia",
    nativeName: "Bahasa Malaysia",
    flag: "🇲🇾",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
  },
];

// Initialize i18next
i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is missing

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Detection options
    detection: {
      // Order of language detection methods
      order: ["localStorage", "navigator", "htmlTag"],

      // Cache user language
      caches: ["localStorage"],

      // Storage key for localStorage
      lookupLocalStorage: "i18nextLng",
    },

    // Debugging (disable in production)
    debug: import.meta.env.DEV,

    // React specific options
    react: {
      useSuspense: false, // Disable suspense to avoid loading states
    },
  });

export default i18n;
