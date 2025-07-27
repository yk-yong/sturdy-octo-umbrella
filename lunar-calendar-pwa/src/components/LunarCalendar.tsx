import { useState, useEffect } from "react";
import type {
  Festival,
  Language,
  CalendarView,
  LunarDate,
} from "../types/calendar";
import { LunarCalendarUtils } from "../utils/lunarCalendar";
import FestivalDetail from "./FestivalDetail";
import EventForm, { type PersonalEvent } from "./EventForm";
import festivalData from "../data/lunarFestivals.json";

function LunarCalendar() {
  const [currentDate, setCurrentDate] = useState<LunarDate>({
    month: 1,
    day: 1,
  });
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<CalendarView>("month");
  const [festivals] = useState<Festival[]>(
    festivalData.festivals as Festival[]
  );
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(
    null
  );
  const [showFestivalDetail, setShowFestivalDetail] = useState<boolean>(false);
  const [personalEvents, setPersonalEvents] = useState<PersonalEvent[]>([]);
  const [showEventForm, setShowEventForm] = useState<boolean>(false);
  const [selectedDateForEvent, setSelectedDateForEvent] =
    useState<LunarDate | null>(null);
  const [monthDays, setMonthDays] = useState<LunarDate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeCalendar = async () => {
      setIsLoading(true);
      try {
        const today = await LunarCalendarUtils.getCurrentLunarDate();
        console.log("Initializing calendar with today's date:", today);

        setCurrentDate(today);
        setSelectedMonth(today.month);
      } catch (error) {
        console.error("Error initializing calendar:", error);
        // Fallback to a default date
        setCurrentDate({ month: 1, day: 1 });
        setSelectedMonth(1);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCalendar();
  }, []);

  useEffect(() => {
    const loadMonthDays = async () => {
      if (view === "month") {
        try {
          const days = await LunarCalendarUtils.getMonthDays(selectedMonth);
          setMonthDays(days);
        } catch (error) {
          console.error("Error loading month days:", error);
          setMonthDays([]);
        }
      }
    };

    loadMonthDays();
  }, [selectedMonth, view]);

  const getFestivalsForDate = (date: LunarDate): Festival[] => {
    return festivals.filter((festival) =>
      LunarCalendarUtils.isSameDate(festival.date.lunar, date)
    );
  };

  const getPersonalEventsForDate = (date: LunarDate): PersonalEvent[] => {
    return personalEvents.filter((event) =>
      LunarCalendarUtils.isSameDate(event.date, date)
    );
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === "en" ? "zh" : "en";
    setLanguage(newLanguage);
  };

  const handleViewToggle = () => {
    const newView = view === "month" ? "year" : "month";
    setView(newView);
  };

  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    if (view === "year") {
      setView("month");
    }
  };

  const handleFestivalClick = (festival: Festival) => {
    setSelectedFestival(festival);
    setShowFestivalDetail(true);
  };

  const handleCloseFestivalDetail = () => {
    setShowFestivalDetail(false);
    setSelectedFestival(null);
  };

  const handleAddEvent = (date?: LunarDate) => {
    if (date) {
      setSelectedDateForEvent(date);
    } else {
      setSelectedDateForEvent(currentDate);
    }
    setShowEventForm(true);
  };

  const handleSaveEvent = (event: PersonalEvent) => {
    setPersonalEvents((prev) => [...prev, event]);
  };

  const handleCloseEventForm = () => {
    setShowEventForm(false);
    setSelectedDateForEvent(null);
  };

  const handlePrevMonth = () => {
    if (selectedMonth > 1) {
      setSelectedMonth(selectedMonth - 1);
    } else {
      setSelectedMonth(12);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth < 12) {
      setSelectedMonth(selectedMonth + 1);
    } else {
      setSelectedMonth(1);
    }
  };

  const renderMonthView = () => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center text-gray-500">
            {language === "zh" && "加载中..."}
            {language === "en" && "Loading..."}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold"
            aria-label="Previous month"
          >
            ←
          </button>

          <h2 className="text-2xl font-bold text-red-900">
            {LunarCalendarUtils.getLunarMonthName(selectedMonth, language)}
          </h2>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold"
            aria-label="Next month"
          >
            →
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {language === "zh"
            ? ["日", "一", "二", "三", "四", "五", "六"].map((day, index) => (
                <div
                  key={index}
                  className="p-2 text-center font-semibold text-red-800"
                >
                  {day}
                </div>
              ))
            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => (
                  <div
                    key={index}
                    className="p-2 text-center font-semibold text-red-800"
                  >
                    {day}
                  </div>
                )
              )}

          {/* Calendar days */}
          {monthDays.map((date, index) => {
            const dayFestivals = getFestivalsForDate(date);
            const dayEvents = getPersonalEventsForDate(date);
            const isToday = LunarCalendarUtils.isSameDate(date, currentDate);
            const hasFestival = dayFestivals.length > 0;
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={index}
                onClick={() => handleAddEvent(date)}
                className={`
                  p-3 min-h-[80px] border rounded-lg cursor-pointer transition-colors
                  ${
                    isToday
                      ? "bg-yellow-100 border-yellow-400"
                      : "border-gray-200"
                  }
                  ${hasFestival ? "bg-red-50 border-red-200" : ""}
                  ${
                    hasEvents && !hasFestival
                      ? "bg-blue-50 border-blue-200"
                      : ""
                  }
                  hover:bg-yellow-50
                `}
              >
                <div className="text-sm font-medium text-gray-700">
                  {language === "zh"
                    ? LunarCalendarUtils.formatLunarDate(date, "zh").split(
                        "月"
                      )[1] || date.day
                    : date.day}
                </div>

                {dayFestivals.map((festival, festivalIndex) => (
                  <button
                    type="button"
                    key={festivalIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFestivalClick(festival);
                    }}
                    className={`
                      text-xs mt-1 p-1 rounded truncate w-full text-left hover:opacity-80 transition-opacity
                      ${
                        festival.type === "major"
                          ? "bg-red-600 text-white"
                          : "bg-orange-500 text-white"
                      }
                    `}
                    title={festival.name[language]}
                  >
                    {festival.name[language]}
                  </button>
                ))}

                {dayEvents.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`
                      text-xs mt-1 p-1 rounded truncate
                      ${
                        event.type === "personal"
                          ? "bg-blue-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    `}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-900 mb-6 text-center">
          {language === "zh" ? "农历年历" : "Lunar Year Calendar"}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {months.map((month) => {
            const monthFestivals = festivals.filter(
              (f) => f.date.lunar.month === month
            );

            return (
              <button
                type="button"
                key={month}
                onClick={() => handleMonthSelect(month)}
                className={`
                  p-4 rounded-lg border-2 transition-colors
                  ${
                    month === selectedMonth
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }
                  hover:border-yellow-300 hover:bg-yellow-25
                `}
              >
                <div className="font-semibold text-red-900 mb-2">
                  {LunarCalendarUtils.getLunarMonthName(month, language)}
                </div>

                <div className="text-sm space-y-1">
                  {monthFestivals.slice(0, 2).map((festival, index) => (
                    <div
                      key={index}
                      className={`
                        text-xs p-1 rounded truncate
                        ${
                          festival.type === "major"
                            ? "bg-red-600 text-white"
                            : "bg-orange-500 text-white"
                        }
                      `}
                    >
                      {festival.name[language]}
                    </div>
                  ))}

                  {monthFestivals.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{monthFestivals.length - 2} more
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-red-900">
              {language === "zh" ? "农历日历" : "Chinese Lunar Calendar"}
            </h1>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleAddEvent()}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              >
                {language === "zh" ? "添加事件" : "Add Event"}
              </button>

              <button
                type="button"
                onClick={handleLanguageToggle}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-red-900 font-semibold rounded-lg transition-colors"
              >
                {language === "zh" ? "English" : "中文"}
              </button>

              <button
                type="button"
                onClick={handleViewToggle}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                {view === "month"
                  ? language === "zh"
                    ? "年视图"
                    : "Year View"
                  : language === "zh"
                  ? "月视图"
                  : "Month View"}
              </button>
            </div>
          </div>

          <div className="text-gray-600">
            {language === "zh" ? "今日：" : "Today: "}
            <span className="font-semibold text-red-800">
              {LunarCalendarUtils.formatLunarDate(currentDate, language)}
            </span>
          </div>
        </header>

        {/* Calendar Content */}
        {view === "month" ? renderMonthView() : renderYearView()}

        {/* Festival Detail Modal */}
        {selectedFestival && (
          <FestivalDetail
            festival={selectedFestival}
            language={language}
            isOpen={showFestivalDetail}
            onClose={handleCloseFestivalDetail}
          />
        )}

        {/* Event Form Modal */}
        <EventForm
          language={language}
          isOpen={showEventForm}
          onClose={handleCloseEventForm}
          onSave={handleSaveEvent}
          initialDate={selectedDateForEvent || undefined}
        />
      </div>
    </div>
  );
}

export default LunarCalendar;
