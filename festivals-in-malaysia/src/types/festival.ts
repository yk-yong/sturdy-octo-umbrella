// Multi-language text interface following workspace pattern
export interface MultiLanguageText {
  en: string;
  zh: string;
  ms: string; // Adding Malay for Malaysia-specific content
}

// Festival categories as defined in PRD
export type FestivalCategory =
  | "religious"
  | "cultural"
  | "national"
  | "local"
  | "notable";

// Malaysian regions as defined in PRD
export type MalaysianRegion =
  | "northern"
  | "central"
  | "southern"
  | "eastern"
  | "nationwide";

// Date information for festivals
export interface FestivalDate {
  // Fixed date (e.g., "January 1")
  fixed?: string;
  // Variable date description (e.g., "First day of Chinese New Year")
  variable?: MultiLanguageText;
  // Actual date for current year (ISO format)
  currentYear?: string;
  // Month for sorting/filtering
  month?: number;
}

// Festival data structure
export interface Festival {
  id: string;
  name: MultiLanguageText;
  description: MultiLanguageText;
  significance: MultiLanguageText;
  category: FestivalCategory;
  regions: MalaysianRegion[];
  date: FestivalDate;
  // Optional media
  imageUrl?: string;
  videoUrl?: string;
  // Cultural practices
  practices?: MultiLanguageText[];
  // Related articles/links
  relatedLinks?: {
    title: MultiLanguageText;
    url: string;
  }[];
  // Keywords for search
  keywords?: MultiLanguageText[];
}

// Filter state interface
export interface FilterState {
  category: FestivalCategory | "all";
  region: MalaysianRegion | "all";
  searchQuery: string;
}

// Language options
export type Language = "en" | "zh" | "ms";

// UI state interface
export interface UIState {
  language: Language;
  selectedFestival: Festival | null;
  isDetailModalOpen: boolean;
}
