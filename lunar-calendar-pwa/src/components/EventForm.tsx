import { useState, useEffect } from "react";
import type { Language, LunarDate } from "../types/calendar";
import { LunarCalendarUtils } from "../utils/lunarCalendar";

interface EventFormProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: PersonalEvent) => void;
  initialDate?: LunarDate;
}

export interface PersonalEvent {
  id: string;
  title: string;
  date: LunarDate;
  description: string;
  type: "personal" | "reminder";
}

function EventForm({
  language,
  isOpen,
  onClose,
  onSave,
  initialDate,
}: EventFormProps) {
  const [title, setTitle] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(initialDate?.month || 1);
  const [selectedDay, setSelectedDay] = useState(initialDate?.day || 1);
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState<"personal" | "reminder">(
    "personal"
  );
  const [maxDaysInMonth, setMaxDaysInMonth] = useState(30);

  useEffect(() => {
    const loadMaxDays = async () => {
      try {
        const maxDays = await LunarCalendarUtils.getDaysInLunarMonth(
          selectedMonth
        );
        setMaxDaysInMonth(maxDays);

        // Adjust selected day if it exceeds the max days in the new month
        if (selectedDay > maxDays) {
          setSelectedDay(maxDays);
        }
      } catch (error) {
        console.error("Error loading max days for month:", error);
        // Fallback to a reasonable default
        const fallbackDays = selectedMonth % 2 === 1 ? 30 : 29;
        setMaxDaysInMonth(fallbackDays);
      }
    };

    loadMaxDays();
  }, [selectedMonth, selectedDay]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newEvent: PersonalEvent = {
      id: Date.now().toString(),
      title: title.trim(),
      date: { month: selectedMonth, day: selectedDay },
      description: description.trim(),
      type: eventType,
    };

    onSave(newEvent);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setSelectedMonth(initialDate?.month || 1);
    setSelectedDay(initialDate?.day || 1);
    setEventType("personal");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {language === "zh" ? "添加事件" : "Add Event"}
            </h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-red-900 hover:text-white rounded transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {language === "zh" ? "事件标题" : "Event Title"}
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder={
                language === "zh" ? "输入事件标题..." : "Enter event title..."
              }
              required
            />
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {language === "zh" ? "月份" : "Month"}
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={async (e) => {
                  const month = parseInt(e.target.value);
                  setSelectedMonth(month);

                  try {
                    const maxDays =
                      await LunarCalendarUtils.getDaysInLunarMonth(month);
                    if (selectedDay > maxDays) {
                      setSelectedDay(maxDays);
                    }
                  } catch (error) {
                    console.error("Error getting max days for month:", error);
                    // Fallback adjustment
                    const fallbackDays = month % 2 === 1 ? 30 : 29;
                    if (selectedDay > fallbackDays) {
                      setSelectedDay(fallbackDays);
                    }
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {LunarCalendarUtils.getLunarMonthName(month, language)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="day"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {language === "zh" ? "日期" : "Day"}
              </label>
              <select
                id="day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                {Array.from({ length: maxDaysInMonth }, (_, i) => i + 1).map(
                  (day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === "zh" ? "事件类型" : "Event Type"}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="personal"
                  checked={eventType === "personal"}
                  onChange={(e) => setEventType(e.target.value as "personal")}
                  className="mr-2"
                />
                {language === "zh" ? "个人事件" : "Personal Event"}
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="reminder"
                  checked={eventType === "reminder"}
                  onChange={(e) => setEventType(e.target.value as "reminder")}
                  className="mr-2"
                />
                {language === "zh" ? "提醒" : "Reminder"}
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {language === "zh" ? "描述（可选）" : "Description (Optional)"}
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder={
                language === "zh"
                  ? "添加事件描述..."
                  : "Add event description..."
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              {language === "zh" ? "取消" : "Cancel"}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-red-900 font-semibold rounded-md transition-colors"
            >
              {language === "zh" ? "保存" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
