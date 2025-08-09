import type { Festival, Language } from "../types/festival";
import { FestivalCard } from "./FestivalCard";

interface FestivalGridProps {
  festivals: Festival[];
  language: Language;
  onFestivalClick: (festival: Festival) => void;
}

export const FestivalGrid = ({
  festivals,
  language,
  onFestivalClick,
}: FestivalGridProps) => {
  if (festivals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {language === "ms"
            ? "Tiada festival dijumpai"
            : language === "zh"
            ? "未找到节日"
            : "No festivals found"}
        </h3>
        <p className="text-gray-600">
          {language === "ms"
            ? "Cuba ubah kriteria carian anda"
            : language === "zh"
            ? "请尝试调整搜索条件"
            : "Try adjusting your search criteria"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {festivals.map((festival) => (
        <FestivalCard
          key={festival.id}
          festival={festival}
          language={language}
          onClick={onFestivalClick}
        />
      ))}
    </div>
  );
};
