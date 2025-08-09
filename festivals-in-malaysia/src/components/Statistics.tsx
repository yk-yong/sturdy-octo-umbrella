import type { Festival, Language } from "../types/festival";

interface StatisticsProps {
  festivals: Festival[];
  filteredFestivals: Festival[];
  language: Language;
}

export const Statistics = ({
  festivals,
  filteredFestivals,
  language,
}: StatisticsProps) => {
  // Calculate statistics
  const totalFestivals = festivals.length;
  const categoryCounts = festivals.reduce((acc, festival) => {
    acc[festival.category] = (acc[festival.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const regionCounts = festivals.reduce((acc, festival) => {
    festival.regions.forEach((region) => {
      acc[region] = (acc[region] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const getStatText = () => {
    switch (language) {
      case "ms":
        return {
          showing: "Menunjukkan",
          of: "daripada",
          festivals: "festival",
          categories: "Kategori",
          regions: "Wilayah",
        };
      case "zh":
        return {
          showing: "显示",
          of: "个中的",
          festivals: "个节日",
          categories: "类别",
          regions: "地区",
        };
      default:
        return {
          showing: "Showing",
          of: "of",
          festivals: "festivals",
          categories: "Categories",
          regions: "Regions",
        };
    }
  };

  const statText = getStatText();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Festival Count */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {filteredFestivals.length}
          </div>
          <div className="text-sm text-gray-600">
            {statText.showing} {filteredFestivals.length} {statText.of}{" "}
            {totalFestivals} {statText.festivals}
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            {statText.categories}
          </h3>
          <div className="space-y-1">
            {Object.entries(categoryCounts)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([category, count]) => (
                <div key={category} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{category}</span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Top Regions */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            {statText.regions}
          </h3>
          <div className="space-y-1">
            {Object.entries(regionCounts)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([region, count]) => (
                <div key={region} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">
                    {region === "nationwide"
                      ? language === "ms"
                        ? "Seluruh negara"
                        : language === "zh"
                        ? "全国"
                        : "Nationwide"
                      : region}
                  </span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
