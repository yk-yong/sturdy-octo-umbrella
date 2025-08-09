import { useI18n } from "../i18n/useI18n";
import type { Festival } from "../types/festival";

interface StatisticsProps {
  festivals: Festival[];
  filteredFestivals: Festival[];
}

export const Statistics = ({
  festivals,
  filteredFestivals,
}: StatisticsProps) => {
  const { t } = useI18n();

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Festival Count */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {filteredFestivals.length}
          </div>
          <div className="text-sm text-gray-600">
            {t("statistics.showing")} {filteredFestivals.length}{" "}
            {t("statistics.of")} {totalFestivals} {t("statistics.festivals")}
          </div>
        </div>

        {/* Top Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            {t("statistics.categories")}
          </h3>
          <div className="space-y-1">
            {Object.entries(categoryCounts)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([category, count]) => (
                <div key={category} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">
                    {t(`categories.${category.toLowerCase()}`)}
                  </span>
                  <span className="font-medium text-gray-900">{count}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Top Regions */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            {t("statistics.regions")}
          </h3>
          <div className="space-y-1">
            {Object.entries(regionCounts)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([region, count]) => (
                <div key={region} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">
                    {t(`regions.${region.toLowerCase()}`)}
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
