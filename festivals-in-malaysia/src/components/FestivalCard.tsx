import { useState } from "react";
import type { Festival, Language } from "../types/festival";
import { getLocalizedText, formatFestivalDate } from "../utils/festivalUtils";

interface FestivalCardProps {
  festival: Festival;
  language: Language;
  onClick: (festival: Festival) => void;
}

export const FestivalCard = ({
  festival,
  language,
  onClick,
}: FestivalCardProps) => {
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

  const getCategoryText = (category: string) => {
    const categoryTexts = {
      religious: { en: "Religious", zh: "宗教", ms: "Keagamaan" },
      cultural: { en: "Cultural", zh: "文化", ms: "Budaya" },
      national: { en: "National", zh: "国家", ms: "Nasional" },
      local: { en: "Local", zh: "地方", ms: "Tempatan" },
      notable: { en: "Notable", zh: "著名", ms: "Terkenal" },
    };

    const categoryText = categoryTexts[category as keyof typeof categoryTexts];
    if (!categoryText) return category;

    return categoryText[language] || categoryText.en;
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
            alt={getLocalizedText(festival.name, language)}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to gradient background if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
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
            {getCategoryText(festival.category)}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className="
            bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 
            rounded-md text-xs font-medium text-gray-800
          "
          >
            {formatFestivalDate(festival, language)}
          </span>
        </div>
      </div>

      {/* Festival Content */}
      <div className="p-4">
        {/* Festival Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {getLocalizedText(festival.name, language)}
        </h3>

        {/* Festival Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {getLocalizedText(festival.description, language)}
        </p>

        {/* Regions */}
        <div className="flex flex-wrap gap-1 mb-3">
          {festival.regions.map((region) => (
            <span
              key={region}
              className="
                bg-gray-100 text-gray-700 px-2 py-1 rounded-md
                text-xs font-medium capitalize
              "
            >
              {region === "nationwide"
                ? language === "ms"
                  ? "Seluruh negara"
                  : language === "zh"
                  ? "全国"
                  : "Nationwide"
                : region}
            </span>
          ))}
        </div>

        {/* Learn More */}
        <div className="flex items-center justify-between">
          <span className="text-blue-600 text-sm font-medium">
            {language === "ms"
              ? "Ketahui Lebih Lanjut"
              : language === "zh"
              ? "了解更多"
              : "Learn More"}
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
