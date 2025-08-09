import type { Language } from "../types/festival";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const getHeaderText = () => {
    switch (language) {
      case "ms":
        return {
          title: "Festival di Malaysia",
          subtitle: "Jelajahi kepelbagaian budaya dan tradisi Malaysia",
        };
      case "zh":
        return {
          title: "马来西亚节日",
          subtitle: "探索马来西亚丰富的文化和传统",
        };
      default:
        return {
          title: "Festivals in Malaysia",
          subtitle: "Explore Malaysia's rich cultural diversity and traditions",
        };
    }
  };

  const headerText = getHeaderText();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Title and Subtitle */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {headerText.title}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              {headerText.subtitle}
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex-shrink-0">
            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-4 opacity-70">
          <div className="text-2xl">🏮</div>
          <div className="text-2xl">🕌</div>
          <div className="text-2xl">🪔</div>
          <div className="text-2xl">🎄</div>
          <div className="text-2xl">🇲🇾</div>
        </div>
      </div>
    </header>
  );
};
