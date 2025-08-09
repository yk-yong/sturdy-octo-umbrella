import type {
  Festival,
  FilterState,
  Language,
  MultiLanguageText,
  MalaysianRegion,
} from "../types/festival";
import festivalsData from "../data/festivals.json";

// Get localized text based on current language
export const getLocalizedText = (
  text: MultiLanguageText,
  language: Language
): string => {
  return text[language] || text.en;
};

// Load all festivals
export const getAllFestivals = (): Festival[] => {
  return festivalsData as Festival[];
};

// Filter festivals based on filter state
export const filterFestivals = (
  festivals: Festival[],
  filters: FilterState
): Festival[] => {
  let filtered = festivals;

  // Filter by category
  if (filters.category !== "all") {
    filtered = filtered.filter(
      (festival) => festival.category === filters.category
    );
  }

  // Filter by region
  if (filters.region !== "all") {
    filtered = filtered.filter(
      (festival) =>
        festival.regions.includes(filters.region as MalaysianRegion) ||
        festival.regions.includes("nationwide")
    );
  }

  // Filter by search query
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    filtered = filtered.filter((festival) => {
      // Search in name
      const nameMatch = Object.values(festival.name).some((name) =>
        name.toLowerCase().includes(query)
      );

      // Search in description
      const descriptionMatch = Object.values(festival.description).some(
        (desc) => desc.toLowerCase().includes(query)
      );

      // Search in keywords
      const keywordMatch =
        festival.keywords?.some((keyword) =>
          Object.values(keyword).some((kw) => kw.toLowerCase().includes(query))
        ) || false;

      return nameMatch || descriptionMatch || keywordMatch;
    });
  }

  return filtered;
};

// Sort festivals by date (month)
export const sortFestivalsByDate = (festivals: Festival[]): Festival[] => {
  return [...festivals].sort((a, b) => {
    const monthA = a.date.month || 12;
    const monthB = b.date.month || 12;
    return monthA - monthB;
  });
};

// Get festival by ID
export const getFestivalById = (id: string): Festival | undefined => {
  return festivalsData.find((festival) => festival.id === id) as
    | Festival
    | undefined;
};

// Get festivals by category
export const getFestivalsByCategory = (category: string): Festival[] => {
  if (category === "all") return getAllFestivals();
  return festivalsData.filter(
    (festival) => festival.category === category
  ) as Festival[];
};

// Get festivals by region
export const getFestivalsByRegion = (region: string): Festival[] => {
  if (region === "all") return getAllFestivals();
  return festivalsData.filter(
    (festival) =>
      festival.regions.includes(region as MalaysianRegion) ||
      festival.regions.includes("nationwide")
  ) as Festival[];
};

// Get upcoming festivals (based on current date)
export const getUpcomingFestivals = (): Festival[] => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed

  return festivalsData.filter((festival) => {
    const festivalMonth = festival.date.month;
    if (!festivalMonth) return false;

    // If festival month is greater than current month, it's upcoming this year
    if (festivalMonth > currentMonth) return true;

    // If festival month equals current month, check the day
    if (festivalMonth === currentMonth && festival.date.currentYear) {
      const festivalDate = new Date(festival.date.currentYear);
      return festivalDate >= currentDate;
    }

    return false;
  }) as Festival[];
};

// Format date display
export const formatFestivalDate = (
  festival: Festival,
  language: Language
): string => {
  if (festival.date.fixed) {
    return festival.date.fixed;
  }

  if (festival.date.variable) {
    return getLocalizedText(festival.date.variable, language);
  }

  if (festival.date.currentYear) {
    const date = new Date(festival.date.currentYear);
    return date.toLocaleDateString(
      language === "ms" ? "ms-MY" : language === "zh" ? "zh-CN" : "en-US"
    );
  }

  return "Date TBD";
};
