import type { LunarDate } from "../types/calendar";

// Abstract interface for lunar calendar services
export interface ILunarCalendarService {
  getCurrentLunarDate(): LunarDate;
  solarToLunar(solarDate: Date): LunarDate;
  lunarToSolar(lunarDate: LunarDate, year?: number): Date;
  getDaysInLunarMonth(month: number, year?: number): number;
  isLeapMonth(month: number, year?: number): boolean;
}

// Type for the lunar-javascript library
interface LunarLib {
  Solar: {
    fromYmd(
      year: number,
      month: number,
      day: number
    ): {
      getLunar(): {
        getYear(): number;
        getMonth(): number;
        getDay(): number;
        isLeap(): boolean;
      };
    };
  };
  Lunar: {
    fromYmd(
      year: number,
      month: number,
      day: number
    ): {
      getSolar(): {
        getYear(): number;
        getMonth(): number;
        getDay(): number;
      };
    };
  };
  LunarMonth: {
    fromYm(
      year: number,
      month: number
    ): {
      getDayCount(): number;
    };
  };
  LunarYear: {
    fromYear(year: number): {
      getLeapMonth(): number;
    };
  };
}

// Adapter class for lunar-javascript library
export class LunarJavaScriptAdapter implements ILunarCalendarService {
  private lunarLib: LunarLib | null;

  constructor() {
    // Dynamic import will be handled in initialization
    this.lunarLib = null;
  }

  async initialize(): Promise<void> {
    try {
      // Dynamic import of lunar-javascript
      const lunarModule = await import("lunar-javascript");
      this.lunarLib = lunarModule as unknown as LunarLib;
    } catch {
      console.warn(
        "lunar-javascript not available, falling back to simple implementation"
      );
      // Fallback to simple implementation if library is not available
      this.lunarLib = null;
    }
  }

  getCurrentLunarDate(): LunarDate {
    if (!this.lunarLib) {
      return this.getSimpleLunarDate();
    }

    try {
      const now = new Date();
      const solar = this.lunarLib.Solar.fromYmd(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate()
      );
      const lunar = solar.getLunar();

      return {
        month: lunar.getMonth(),
        day: lunar.getDay(),
      };
    } catch {
      console.error("Error getting current lunar date, using fallback");
      return this.getSimpleLunarDate();
    }
  }

  solarToLunar(solarDate: Date): LunarDate {
    if (!this.lunarLib) {
      return this.getSimpleLunarDate(solarDate);
    }

    try {
      const solar = this.lunarLib.Solar.fromYmd(
        solarDate.getFullYear(),
        solarDate.getMonth() + 1,
        solarDate.getDate()
      );
      const lunar = solar.getLunar();

      return {
        month: lunar.getMonth(),
        day: lunar.getDay(),
      };
    } catch {
      console.error("Error converting solar to lunar date, using fallback");
      return this.getSimpleLunarDate(solarDate);
    }
  }

  lunarToSolar(
    lunarDate: LunarDate,
    year: number = new Date().getFullYear()
  ): Date {
    if (!this.lunarLib) {
      return this.getSimpleSolarDate(lunarDate, year);
    }

    try {
      const lunar = this.lunarLib.Lunar.fromYmd(
        year,
        lunarDate.month,
        lunarDate.day
      );
      const solar = lunar.getSolar();

      return new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay());
    } catch {
      console.error("Error converting lunar to solar date, using fallback");
      return this.getSimpleSolarDate(lunarDate, year);
    }
  }

  getDaysInLunarMonth(
    month: number,
    year: number = new Date().getFullYear()
  ): number {
    if (!this.lunarLib) {
      // Simplified - lunar months alternate between 29 and 30 days
      return month % 2 === 1 ? 30 : 29;
    }

    try {
      const lunarMonth = this.lunarLib.LunarMonth.fromYm(year, month);
      return lunarMonth.getDayCount();
    } catch {
      console.error("Error getting lunar month days, using fallback");
      return month % 2 === 1 ? 30 : 29;
    }
  }

  isLeapMonth(month: number, year: number = new Date().getFullYear()): boolean {
    if (!this.lunarLib) {
      return false;
    }

    try {
      const lunarYear = this.lunarLib.LunarYear.fromYear(year);
      const leapMonth = lunarYear.getLeapMonth();
      return leapMonth === month;
    } catch {
      console.error("Error checking leap month, using fallback");
      return false;
    }
  }

  // Fallback simple implementation
  private getSimpleLunarDate(date: Date = new Date()): LunarDate {
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

  private getSimpleSolarDate(lunarDate: LunarDate, year: number): Date {
    // Simple approximation - add lunar days to start of year
    const baseDate = new Date(year, 0, 1);
    const approxDays = (lunarDate.month - 1) * 29.5 + lunarDate.day;
    const resultDate = new Date(baseDate);
    resultDate.setDate(resultDate.getDate() + approxDays);
    return resultDate;
  }
}

// Singleton instance
let lunarServiceInstance: LunarJavaScriptAdapter | null = null;

export async function getLunarCalendarService(): Promise<ILunarCalendarService> {
  if (!lunarServiceInstance) {
    lunarServiceInstance = new LunarJavaScriptAdapter();
    await lunarServiceInstance.initialize();
  }
  return lunarServiceInstance;
}
