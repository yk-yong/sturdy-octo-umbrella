import { useI18n } from "../i18n/useI18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Header = () => {
  const { t } = useI18n();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Title and Subtitle */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t("app.title")}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              {t("app.subtitle")}
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex-shrink-0">
            <LanguageSwitcher />
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
