import { useState } from "react";
import { useI18n, getLocalizedText } from "../i18n/useI18n";
import type { Festival } from "../types/festival";
import { formatFestivalDate } from "../utils/festivalUtils";

interface FestivalCardProps {
  festival: Festival;
  onClick: (festival: Festival) => void;
}

export const FestivalCard = ({ festival, onClick }: FestivalCardProps) => {
  const { t, currentLanguage } = useI18n();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick(festival);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "religious":
        return "bg-blue-100 text-blue-800";
      case "cultural":
        return "bg-green-100 text-green-800";
      case "national":
        return "bg-red-100 text-red-800";
      case "local":
        return "bg-yellow-100 text-yellow-800";
      case "notable":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryText = () => {
    return t(`categories.${festival.category.toLowerCase()}`);
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
        transform transition-all duration-300 ease-in-out
        hover:shadow-xl hover:scale-105 border border-gray-200
        ${isHovered ? "shadow-xl scale-105" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Festival Image */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
        {festival.imageUrl ? (
          <img
            src={festival.imageUrl}
            alt={getLocalizedText(festival.name, currentLanguage)}
            className="w-full h-56 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : null}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${getCategoryColor(festival.category)}
          `}
          >
            {getCategoryText()}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className="
            bg-white/90 backdrop-blur-sm px-2 py-1 
            rounded-md text-xs font-medium text-gray-800
          "
          >
            {formatFestivalDate(festival, currentLanguage)}
          </span>
        </div>
      </div>

      {/* Festival Content */}
      <div className="p-4">
        {/* Festival Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {getLocalizedText(festival.name, currentLanguage)}
        </h3>

        {/* Festival Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {getLocalizedText(festival.description, currentLanguage)}
        </p>

        {/* Regions */}
        <div className="flex flex-wrap gap-1 mb-3">
          {festival.regions && festival.regions.length > 0
            ? t(`regions.${festival.regions[0].toLowerCase()}`)
            : t("regions.nationwide")}
        </div>

        {/* Learn More */}
        <div className="flex items-center justify-between">
          <span className="text-blue-600 text-sm font-medium">
            {t("learnMore")}
          </span>
          <svg
            className={`w-4 h-4 text-blue-600 transform transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
