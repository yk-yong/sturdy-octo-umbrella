import { useI18n } from "../i18n/useI18n";
import type { Festival } from "../types/festival";
import { FestivalCard } from "./FestivalCard";

interface FestivalGridProps {
  festivals: Festival[];
  onFestivalClick: (festival: Festival) => void;
}

export const FestivalGrid = ({
  festivals,
  onFestivalClick,
}: FestivalGridProps) => {
  const { t } = useI18n();

  if (festivals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("noFestivalsFound")}
        </h3>
        <p className="text-gray-600">{t("adjustSearchCriteria")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {festivals.map((festival) => (
        <FestivalCard
          key={festival.id}
          festival={festival}
          onClick={onFestivalClick}
        />
      ))}
    </div>
  );
};
