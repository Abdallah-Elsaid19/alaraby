"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

/**
 * Reusable Calendar Component
 * @param {Date} selectedDate - Currently selected date
 * @param {Function} onDateSelect - Callback when date is selected
 * @param {Date} minDate - Minimum selectable date (default: today)
 * @param {Date} maxDate - Maximum selectable date
 */
export default function Calendar({ selectedDate, onDateSelect, minDate = new Date(), maxDate }) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate || new Date()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const isDateDisabled = (date) => {
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);

    if (dateToCheck < minDate) return true;
    if (maxDate && dateToCheck > maxDate) return true;
    return false;
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);
    return dateToCheck.getTime() === selected.getTime();
  };

  const isToday = (date) => {
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck.getTime() === today.getTime();
  };

  const handleDateClick = (day) => {
  const clickedDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    day,
    0, 0, 0, 0 // ساعة 0، دقيقة 0، ثانية 0، ملي ثانية 0
  );
  if (!isDateDisabled(clickedDate)) {
    onDateSelect(clickedDate);
  }
};


  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Get previous month's last days
  const prevMonth = new Date(year, month - 1, 0);
  const prevMonthDays = prevMonth.getDate();
  const prevMonthDaysArray = [];
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    prevMonthDaysArray.push(prevMonthDays - i);
  }

  // Get next month's first days to fill the grid
  const totalCells = startingDayOfWeek + daysInMonth;
  const remainingCells = 42 - totalCells; // 6 rows * 7 days
  const nextMonthDaysArray = [];
  for (let i = 1; i <= remainingCells; i++) {
    nextMonthDaysArray.push(i);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {monthNames[month]} {year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Previous month days */}
        {prevMonthDaysArray.map((day) => {
          const date = new Date(year, month - 1, day);
          return (
            <button
              key={`prev-${day}`}
              disabled
              className="p-2 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed"
            >
              {day}
            </button>
          );
        })}

        {/* Current month days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(year, month, day);
          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          const todayClass = isToday(date);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              className={`
                p-2 text-sm rounded-md transition-all
                ${disabled
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : selected
                  ? "bg-teal-600 text-white font-semibold"
                  : todayClass
                  ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              {day}
            </button>
          );
        })}

        {/* Next month days */}
        {nextMonthDaysArray.map((day) => (
          <button
            key={`next-${day}`}
            disabled
            className="p-2 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed"
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
