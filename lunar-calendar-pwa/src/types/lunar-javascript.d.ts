declare module "lunar-javascript" {
  interface LunarResult {
    lYear: number;
    lMonth: number;
    lDay: number;
    Animal: string;
    IMonthCn: string;
    IDayCn: string;
    cYear: number;
    cMonth: number;
    cDay: number;
    gzYear: string;
    gzMonth: string;
    gzDay: string;
    isToday: boolean;
    isLeap: boolean;
    nWeek: number;
    ncWeek: string;
    isTerm: boolean;
    Term: string;
    astro: string;
  }

  interface LunarCalendar {
    fromYmd(year: number, month: number, day: number): LunarResult;
  }

  const calendar: LunarCalendar;
  export = calendar;
}
