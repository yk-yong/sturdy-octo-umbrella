import { useEffect, useRef } from "react";
import { useI18n, getLocalizedText } from "../i18n/useI18n";
import type { Festival } from "../types/festival";
import { formatFestivalDate } from "../utils/festivalUtils";

interface FestivalDetailModalProps {
  festival: Festival | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FestivalDetailModal = ({
  festival,
  isOpen,
  onClose,
}: FestivalDetailModalProps) => {
  const { t, currentLanguage } = useI18n();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !festival) {
    return null;
  }

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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="
          bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto
          transform transition-all duration-300 ease-in-out
          animate-in fade-in zoom-in-95
        "
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span
              className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${getCategoryColor(festival.category)}
            `}
            >
              {t(`categories.${festival.category.toLowerCase()}`)}
            </span>
            <span className="text-sm text-gray-600">
              {formatFestivalDate(festival, currentLanguage)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="
              p-2 hover:bg-gray-100 rounded-full transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            aria-label={t("modal.closeAriaLabel")}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Festival Image */}
          {festival.imageUrl && (
            <div className="mb-6">
              <img
                src={festival.imageUrl}
                alt={getLocalizedText(festival.name, currentLanguage)}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Festival Name */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getLocalizedText(festival.name, currentLanguage)}
          </h1>

          {/* Regions */}
          <div className="flex flex-wrap gap-2 mb-6">
            {festival.regions.map((region) => (
              <span
                key={region}
                className="
                  bg-gray-100 text-gray-700 px-3 py-1 rounded-full
                  text-sm font-medium capitalize
                "
              >
                {t(`regions.${region.toLowerCase()}`)}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t("festival.description")}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {getLocalizedText(festival.description, currentLanguage)}
            </p>
          </div>

          {/* Significance */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t("festival.significance")}
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {getLocalizedText(festival.significance, currentLanguage)}
            </p>
          </div>

          {/* Cultural Practices */}
          {festival.practices && festival.practices.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("festival.culturalPractices")}
              </h2>
              <ul className="space-y-2">
                {festival.practices.map((practice, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {getLocalizedText(practice, currentLanguage)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Links */}
          {festival.relatedLinks && festival.relatedLinks.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("festival.relatedLinks")}
              </h2>
              <div className="space-y-2">
                {festival.relatedLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block p-3 border border-gray-200 rounded-lg
                      hover:bg-blue-50 hover:border-blue-300
                      transition-colors duration-200
                    "
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium">
                        {getLocalizedText(link.title, currentLanguage)}
                      </span>
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {festival.videoUrl && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("festival.video")}
              </h2>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={festival.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${getLocalizedText(
                    festival.name,
                    currentLanguage
                  )} video`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
