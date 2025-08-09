import { useI18n } from "../i18n/useI18n";
import { supportedLanguages } from "../i18n";
import type { Language } from "../types/festival";

export const LanguageSwitcher = () => {
  const { t, currentLanguage, changeLanguage } = useI18n();

  return (
    <div className="relative inline-block">
      <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
        {supportedLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code as Language)}
            className={`
              px-2 py-1 rounded-md text-sm font-medium transition-all duration-200
              flex items-center space-x-1
              ${
                currentLanguage === lang.code
                  ? "bg-blue-100 text-blue-800 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }
            `}
            aria-label={t("accessibility.switchLanguage", {
              language: lang.name,
            })}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.nativeName}</span>
            <span className="sm:hidden">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
