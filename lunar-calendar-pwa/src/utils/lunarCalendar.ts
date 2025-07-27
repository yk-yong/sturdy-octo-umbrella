import type { LunarDate } from "../types/calendar";
import {
  getLunarCalendarService,
  type ILunarCalendarService,
} from "../services/lunarCalendarAdapter";

// Enhanced lunar calendar utilities using lunar-javascript library
export class LunarCalendarUtils {
  private static servicePromise: Promise<ILunarCalendarService> | null = null;
  private static cachedService: ILunarCalendarService | null = null;

  private static async getService(): Promise<ILunarCalendarService> {
    if (!this.servicePromise) {
      this.servicePromise = getLunarCalendarService();
    }

    if (!this.cachedService) {
      this.cachedService = await this.servicePromise;
    }

    return this.cachedService;
  }

  // Async methods for accurate calculations
  static async getCurrentLunarDate(): Promise<LunarDate> {
    const service = await this.getService();
    return service.getCurrentLunarDate();
  }

  static async solarToLunar(solarDate: Date): Promise<LunarDate> {
    const service = await this.getService();
    return service.solarToLunar(solarDate);
  }

  static async lunarToSolar(
    lunarDate: LunarDate,
    year?: number
  ): Promise<Date> {
    const service = await this.getService();
    return service.lunarToSolar(lunarDate, year);
  }

  // Synchronous methods for immediate use (may use fallback calculations)
  static getCurrentLunarDateSync(): LunarDate {
    if (this.cachedService) {
      return this.cachedService.getCurrentLunarDate();
    }

    // Fallback calculation
    return this.getSimpleLunarDate();
  }

  private static getSimpleLunarDate(date: Date = new Date()): LunarDate {
    const baseDate = new Date(2024, 0, 1); // Approximate start of lunar year
    const diffDays = Math.floor(
      (date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Approximate lunar month calculation (29.5 days per month)
    const lunarMonth = Math.floor(diffDays / 29.5) + 1;
    const lunarDay = (diffDays % 29) + 1;

    return {
      month: Math.max(1, Math.min(12, lunarMonth)),
      day: Math.max(1, Math.min(30, lunarDay)),
    };
  }

  static getLunarMonthName(month: number, language: "en" | "zh"): string {
    const monthNames = {
      en: [
        "First Month",
        "Second Month",
        "Third Month",
        "Fourth Month",
        "Fifth Month",
        "Sixth Month",
        "Seventh Month",
        "Eighth Month",
        "Ninth Month",
        "Tenth Month",
        "Eleventh Month",
        "Twelfth Month",
      ],
      zh: [
        "正月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "腊月",
      ],
    };

    const names = monthNames[language];
    const absMonth = Math.abs(month);
    if (absMonth >= 1 && absMonth <= 12) {
      return names[absMonth - 1];
    }
    return "";
  }

  static async getDaysInLunarMonth(
    month: number,
    year?: number
  ): Promise<number> {
    const service = await this.getService();
    return service.getDaysInLunarMonth(month, year);
  }

  static formatLunarDate(date: LunarDate, language: "en" | "zh"): string {
    if (language === "zh") {
      return `${this.getLunarMonthName(
        date.month,
        "zh"
      )}${this.formatChineseDay(date.day)}`;
    }

    return `${this.getLunarMonthName(date.month, "en")} ${date.day}`;
  }

  private static formatChineseDay(day: number): string {
    const dayNames = [
      "初一",
      "初二",
      "初三",
      "初四",
      "初五",
      "初六",
      "初七",
      "初八",
      "初九",
      "初十",
      "十一",
      "十二",
      "十三",
      "十四",
      "十五",
      "十六",
      "十七",
      "十八",
      "十九",
      "二十",
      "廿一",
      "廿二",
      "廿三",
      "廿四",
      "廿五",
      "廿六",
      "廿七",
      "廿八",
      "廿九",
      "三十",
    ];

    if (day >= 1 && day <= dayNames.length) {
      return dayNames[day - 1];
    }
    return day.toString();
  }

  static isSameDate(date1: LunarDate, date2: LunarDate): boolean {
    return date1.month === date2.month && date1.day === date2.day;
  }

  static async getMonthDays(
    month: number,
    year?: number
  ): Promise<LunarDate[]> {
    const daysInMonth = await this.getDaysInLunarMonth(month, year);
    const days: LunarDate[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ month, day });
    }

    return days;
  }

  static async isLeapMonth(month: number, year?: number): Promise<boolean> {
    const service = await this.getService();
    return service.isLeapMonth(month, year);
  }

  // Initialize the service early
  static async initialize(): Promise<void> {
    await this.getService();
  }
}
