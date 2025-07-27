export interface LunarDate {
  month: number;
  day: number;
}

export interface MultiLanguageText {
  en: string;
  zh: string;
}

export interface Festival {
  id: string;
  name: MultiLanguageText;
  date: {
    lunar: LunarDate;
  };
  type: "major" | "traditional" | "minor";
  description: MultiLanguageText;
  preparations: MultiLanguageText[];
}

export interface FestivalData {
  festivals: Festival[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: LunarDate;
  description?: string;
  type: "festival" | "personal" | "reminder";
  festival?: Festival;
}

export type Language = "en" | "zh";

export type CalendarView = "month" | "year";
