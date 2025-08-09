import type {
  FilterState,
  Language,
  FestivalCategory,
  MalaysianRegion,
} from "../types/festival";

interface FilterComponentProps {
  filters: FilterState;
  language: Language;
  onFiltersChange: (filters: FilterState) => void;
}

export const FilterComponent = ({
  filters,
  language,
  onFiltersChange,
}: FilterComponentProps) => {
  const categoryOptions: {
    value: FestivalCategory | "all";
    label: { en: string; zh: string; ms: string };
  }[] = [
    {
      value: "all",
      label: { en: "All Categories", zh: "所有类别", ms: "Semua Kategori" },
    },
    {
      value: "religious",
      label: { en: "Religious", zh: "宗教", ms: "Keagamaan" },
    },
    { value: "cultural", label: { en: "Cultural", zh: "文化", ms: "Budaya" } },
    {
      value: "national",
      label: { en: "National", zh: "国家", ms: "Nasional" },
    },
    { value: "local", label: { en: "Local", zh: "地方", ms: "Tempatan" } },
    { value: "notable", label: { en: "Notable", zh: "著名", ms: "Terkenal" } },
  ];

  const regionOptions: {
    value: MalaysianRegion | "all";
    label: { en: string; zh: string; ms: string };
  }[] = [
    {
      value: "all",
      label: { en: "All Regions", zh: "所有地区", ms: "Semua Wilayah" },
    },
    {
      value: "nationwide",
      label: { en: "Nationwide", zh: "全国", ms: "Seluruh Negara" },
    },
    {
      value: "northern",
      label: { en: "Northern Region", zh: "北部地区", ms: "Wilayah Utara" },
    },
    {
      value: "central",
      label: { en: "Central Region", zh: "中部地区", ms: "Wilayah Tengah" },
    },
    {
      value: "southern",
      label: { en: "Southern Region", zh: "南部地区", ms: "Wilayah Selatan" },
    },
    {
      value: "eastern",
      label: { en: "Eastern Region", zh: "东部地区", ms: "Wilayah Timur" },
    },
  ];

  const handleCategoryChange = (category: FestivalCategory | "all") => {
    onFiltersChange({ ...filters, category });
  };

  const handleRegionChange = (region: MalaysianRegion | "all") => {
    onFiltersChange({ ...filters, region });
  };

  const handleSearchChange = (searchQuery: string) => {
    onFiltersChange({ ...filters, searchQuery });
  };

  const clearFilters = () => {
    onFiltersChange({ category: "all", region: "all", searchQuery: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search Bar */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === "ms"
              ? "Cari Festival"
              : language === "zh"
              ? "搜索节日"
              : "Search Festivals"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="
                w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                text-sm placeholder-gray-500
              "
              placeholder={
                language === "ms"
                  ? "Cari mengikut nama atau kata kunci..."
                  : language === "zh"
                  ? "按名称或关键词搜索..."
                  : "Search by name or keywords..."
              }
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="md:col-span-1">
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {language === "ms"
              ? "Kategori"
              : language === "zh"
              ? "类别"
              : "Category"}
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) =>
              handleCategoryChange(e.target.value as FestivalCategory | "all")
            }
            className="
              w-full px-3 py-2 border border-gray-300 rounded-md
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-sm bg-white
            "
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="md:col-span-1">
          <label
            htmlFor="region-filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {language === "ms"
              ? "Wilayah"
              : language === "zh"
              ? "地区"
              : "Region"}
          </label>
          <select
            id="region-filter"
            value={filters.region}
            onChange={(e) =>
              handleRegionChange(e.target.value as MalaysianRegion | "all")
            }
            className="
              w-full px-3 py-2 border border-gray-300 rounded-md
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-sm bg-white
            "
          >
            {regionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label[language]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters and Clear Button */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.category !== "all" && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {
                categoryOptions.find((opt) => opt.value === filters.category)
                  ?.label[language]
              }
              <button
                onClick={() => handleCategoryChange("all")}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.region !== "all" && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {
                regionOptions.find((opt) => opt.value === filters.region)
                  ?.label[language]
              }
              <button
                onClick={() => handleRegionChange("all")}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.searchQuery && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              "{filters.searchQuery}"
              <button
                onClick={() => handleSearchChange("")}
                className="ml-1 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
        </div>

        {(filters.category !== "all" ||
          filters.region !== "all" ||
          filters.searchQuery) && (
          <button
            onClick={clearFilters}
            className="
              text-sm text-gray-600 hover:text-gray-800
              px-3 py-1 rounded-md hover:bg-gray-100
              transition-colors duration-200
            "
          >
            {language === "ms"
              ? "Kosongkan Semua"
              : language === "zh"
              ? "清除全部"
              : "Clear All"}
          </button>
        )}
      </div>
    </div>
  );
};
