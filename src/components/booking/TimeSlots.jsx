"use client";
import { useMemo } from "react";

/**
 * Convert day abbreviation to full name or match abbreviation
 * @param {string} dayAbbr - Day abbreviation (Mon, Tue, etc.)
 * @returns {string} Full day name or abbreviation
 */
function normalizeDayName(dayAbbr) {
  const dayMap = {
    "sun": "Sunday",
    "mon": "Monday",
    "tue": "Tuesday",
    "wed": "Wednesday",
    "thu": "Thursday",
    "fri": "Friday",
    "sat": "Saturday",
  };

  const normalized = dayAbbr.toLowerCase().trim();
  return dayMap[normalized] || dayAbbr;
}

/**
 * Convert 12-hour format (1PM, 2:30AM) to 24-hour format (13:00, 02:30)
 * @param {string} time12h - Time in 12-hour format
 * @returns {Object} {hours: number, minutes: number}
 */
function convert12To24(time12h) {
  if (!time12h) return { hours: 0, minutes: 0 };

  // Remove spaces and convert to uppercase
  const time = time12h.trim().toUpperCase();

  // Check if it's AM or PM
  const isPM = time.includes("PM");
  const isAM = time.includes("AM");

  // Extract numbers
  const timeMatch = time.match(/(\d+):?(\d+)?/);
  if (!timeMatch) return { hours: 0, minutes: 0 };

  let hours = parseInt(timeMatch[1], 10);
  const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;

  // Convert to 24-hour format
  if (isPM && hours !== 12) {
    hours += 12;
  } else if (isAM && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

/**
 * Generate time slots based on clinic hours
 * @param {Array} clinicHours - Array of clinic hours objects with {day, from, to}
 * @param {Date} selectedDate - Selected date
 * @param {number} slotIntervalMinutes - Minutes between slots (default: 15)
 * @param {number} clinicDurationHours - Total clinic duration in hours (default: 3)
 * @returns {Array} Array of time slot strings in HH:mm format
 */
export function generateTimeSlots(
  clinicHours,
  selectedDate,
  slotIntervalMinutes = 15,
  clinicDurationHours = 3
) {
  if (!clinicHours || clinicHours.length === 0 || !selectedDate) {
    return [];
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const selectedDayIndex = selectedDate.getDay();
  const selectedDayName = dayNames[selectedDayIndex];
  const selectedDayAbbr = dayAbbreviations[selectedDayIndex];

  // Find clinic hours for the selected day (support both full name and abbreviation)
  const dayClinicHours = clinicHours.find((hours) => {
    const hoursDay = hours.day ? hours.day.trim() : "";
    const hoursDayLower = hoursDay.toLowerCase();

    return (
      hoursDayLower === selectedDayName.toLowerCase() ||
      hoursDayLower === selectedDayAbbr.toLowerCase() ||
      hoursDayLower === normalizeDayName(hoursDay).toLowerCase()
    );
  });

  if (!dayClinicHours || !dayClinicHours.from) {
    // Debug: log when no clinic hours found
    if (process.env.NODE_ENV === 'development') {
      console.log('No clinic hours found for:', {
        selectedDay: selectedDayName,
        selectedDayAbbr: selectedDayAbbr,
        clinicHours: clinicHours,
      });
    }
    return [];
  }

  // Convert 12-hour format to 24-hour format
  const { hours: startHour, minutes: startMinute } = convert12To24(dayClinicHours.from);

  // Debug: log conversion
  if (process.env.NODE_ENV === 'development') {
    console.log('Time conversion:', {
      original: dayClinicHours.from,
      converted: { hours: startHour, minutes: startMinute },
    });
  }

  const slots = [];
  const startTime = new Date(selectedDate);
  startTime.setHours(startHour, startMinute, 0, 0);

  // Generate slots for the clinic duration (3 hours by default)
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + clinicDurationHours);

  let currentTime = new Date(startTime);

  while (currentTime < endTime) {
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    slots.push(`${hours}:${minutes}`);

    currentTime.setMinutes(currentTime.getMinutes() + slotIntervalMinutes);
  }

  return slots;
}

/**
 * Reusable Time Slots Component
 * @param {Array} clinicHours - Array of clinic hours
 * @param {Date} selectedDate - Selected date
 * @param {string} selectedTime - Currently selected time slot
 * @param {Function} onTimeSelect - Callback when time slot is selected
 * @param {Array} bookedSlots - Array of booked time slots for the selected date
 * @param {number} slotIntervalMinutes - Minutes between slots (default: 15)
 * @param {number} clinicDurationHours - Total clinic duration in hours (default: 3)
 */
export default function TimeSlots({
  clinicHours,
  selectedDate,
  selectedTime,
  onTimeSelect,
  bookedSlots = [],
  slotIntervalMinutes = 15,
  clinicDurationHours = 3,
}) {
  const timeSlots = useMemo(() => {
    return generateTimeSlots(clinicHours, selectedDate, slotIntervalMinutes, clinicDurationHours);
  }, [clinicHours, selectedDate, slotIntervalMinutes, clinicDurationHours]);


  const isSlotBooked = (slot) => {
    return bookedSlots.some((booked) => booked === slot);
  };

  const isSlotSelected = (slot) => {
    return selectedTime === slot;
  };

  const handleSlotClick = (slot) => {
    if (!isSlotBooked(slot)) {
      onTimeSelect(slot);
    }
  };

  const renderSlot = (slot) => {
    const booked = isSlotBooked(slot);
    const selected = isSlotSelected(slot);

    return (
      <button
        key={slot}
        onClick={() => handleSlotClick(slot)}
        disabled={booked}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all
          ${booked
            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed line-through"
            : selected
              ? "bg-teal-600 text-white shadow-md"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20"
          }
        `}
      >
        {slot}
      </button>
    );
  };

  if (!selectedDate) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Please select a date first
        </p>
      </div>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No available time slots for this day
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Select Time
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {timeSlots.map(renderSlot)}
      </div>
    </div>
  );
}
