import type { LunarDate } from "../types/calendar";

// Simple lunar calendar utilities
// Note: This is a simplified implementation for demonstration
// In a real application, you would use a proper lunar calendar library

export class LunarCalendarUtils {
  static getCurrentLunarDate(): LunarDate {
    // Simplified calculation - in reality this would be more complex
    const now = new Date();
    const baseDate = new Date(2024, 0, 1); // Approximate start of lunar year
    const diffDays = Math.floor(
      (now.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)
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

    return monthNames[language][month - 1] || "";
  }

  static getDaysInLunarMonth(month: number): number {
    // Simplified - lunar months alternate between 29 and 30 days
    return month % 2 === 1 ? 30 : 29;
  }

  static formatLunarDate(date: LunarDate, language: "en" | "zh"): string {
    if (language === "zh") {
      return `${this.getLunarMonthName(
        date.month,
        "zh"
      )}${this.formatChineseDay(date.day)}`;
    } else {
      return `${this.getLunarMonthName(date.month, "en")} ${date.day}`;
    }
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
    return dayNames[day - 1] || day.toString();
  }

  static isSameDate(date1: LunarDate, date2: LunarDate): boolean {
    return date1.month === date2.month && date1.day === date2.day;
  }

  static getMonthDays(month: number): LunarDate[] {
    const daysInMonth = this.getDaysInLunarMonth(month);
    const days: LunarDate[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ month, day });
    }

    return days;
  }
}
