import type { Festival, Language } from "../types/calendar";

interface FestivalDetailProps {
  festival: Festival;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

function FestivalDetail({
  festival,
  language,
  isOpen,
  onClose,
}: FestivalDetailProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{festival.name[language]}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-900 hover:text-white rounded-lg transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="text-red-800 mt-2">
            <span className="bg-red-900 text-white px-2 py-1 rounded text-sm font-medium">
              {festival.type.charAt(0).toUpperCase() + festival.type.slice(1)}{" "}
              Festival
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-3">
              {language === "zh" ? "节日介绍" : "About This Festival"}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {festival.description[language]}
            </p>
          </div>

          {/* Preparations */}
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-3">
              {language === "zh" ? "祭祀准备" : "Preparations & Offerings"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === "zh"
                ? "为了庆祝这个节日，您可能需要准备以下物品："
                : "For celebrating this festival and making proper offerings, you may need to prepare:"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {festival.preparations.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-gray-800">{item[language]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Note for SEA Region */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">
              {language === "zh"
                ? "🏮 东南亚地区提醒"
                : "🏮 Southeast Asia Cultural Note"}
            </h4>
            <p className="text-sm text-gray-700">
              {language === "zh"
                ? "在东南亚地区，许多华人社区会在此节日进行特别的祈祷和供奉仪式。建议提前准备相关物品，并咨询当地华人社区的具体习俗。"
                : "In Southeast Asia, many Chinese communities observe special prayers and offering rituals during this festival. It's recommended to prepare the items in advance and consult with local Chinese community customs."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-red-900 font-semibold py-3 px-4 rounded-lg transition-colors">
              {language === "zh" ? "添加到日历" : "Add to Calendar"}
            </button>
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              {language === "zh" ? "设置提醒" : "Set Reminder"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FestivalDetail;
