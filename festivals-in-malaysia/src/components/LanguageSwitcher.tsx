import type { Language } from "../types/festival";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSwitcher = ({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) => {
  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ms", name: "Bahasa Malaysia", flag: "🇲🇾" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ];

  return (
    <div className="relative inline-block">
      <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`
              px-2 py-1 rounded-md text-sm font-medium transition-all duration-200
              flex items-center space-x-1
              ${
                currentLanguage === lang.code
                  ? "bg-blue-100 text-blue-800 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }
            `}
            aria-label={`Switch to ${lang.name}`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
            <span className="sm:hidden">{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
