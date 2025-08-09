import { useI18n } from "../i18n/useI18n";
import type {
  FilterState,
  FestivalCategory,
  MalaysianRegion,
} from "../types/festival";

interface FilterComponentProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterComponent = ({
  filters,
  onFiltersChange,
}: FilterComponentProps) => {
  const { t } = useI18n();

  const handleCategoryChange = (category: FestivalCategory | "all") => {
    onFiltersChange({ ...filters, category });
  };

  const handleRegionChange = (region: MalaysianRegion | "all") => {
    onFiltersChange({ ...filters, region });
  };

  const handleSearchChange = (searchQuery: string) => {
    onFiltersChange({ ...filters, searchQuery });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      category: "all",
      region: "all",
      searchQuery: "",
    });
  };

  const categoryOptions: Array<{
    value: FestivalCategory | "all";
    label: string;
  }> = [
    { value: "all", label: t("filters.allCategories") },
    { value: "religious", label: t("categories.religious") },
    { value: "cultural", label: t("categories.cultural") },
    { value: "national", label: t("categories.national") },
    { value: "local", label: t("categories.local") },
    { value: "notable", label: t("categories.notable") },
  ];

  const regionOptions: Array<{
    value: MalaysianRegion | "all";
    label: string;
  }> = [
    { value: "all", label: t("filters.allRegions") },
    { value: "nationwide", label: t("regions.nationwide") },
    { value: "northern", label: t("regions.northern") },
    { value: "central", label: t("regions.central") },
    { value: "southern", label: t("regions.southern") },
    { value: "eastern", label: t("regions.eastern") },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="md:col-span-1">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("search.label")}
          </label>
          <input
            id="search"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("search.placeholder")}
            className="
              w-full px-3 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-sm
            "
          />
        </div>

        {/* Category Filter */}
        <div className="md:col-span-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("filters.category")}
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) =>
              handleCategoryChange(e.target.value as FestivalCategory | "all")
            }
            className="
              w-full px-3 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-sm bg-white
            "
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="md:col-span-1">
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t("filters.region")}
          </label>
          <select
            id="region"
            value={filters.region}
            onChange={(e) =>
              handleRegionChange(e.target.value as MalaysianRegion | "all")
            }
            className="
              w-full px-3 py-2 border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-sm bg-white
            "
          >
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.category !== "all" ||
        filters.region !== "all" ||
        filters.searchQuery !== "") && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClearFilters}
            className="
              px-4 py-2 text-sm text-gray-600 hover:text-gray-800
              hover:bg-gray-100 rounded-md transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-500
            "
          >
            {t("filters.clearAll")}
          </button>
        </div>
      )}
    </div>
  );
};
