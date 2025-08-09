// Multi-language text interface following workspace pattern
// Note: We're keeping this for existing festival data compatibility
export interface MultiLanguageText {
  en: string;
  zh: string;
  ms: string; // Adding Malay for Malaysia-specific content
  ja: string; // Adding Japanese for international accessibility
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

// Language options (consistent with i18n)
export type Language = "en" | "zh" | "ms" | "ja";

// UI state interface (simplified since language is now handled by i18n)
export interface UIState {
  selectedFestival: Festival | null;
  isDetailModalOpen: boolean;
}
