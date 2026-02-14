"use client";
import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";
import { fetchBookingsByDateAndDoctor } from "@/api/bookingApi";


export default function AppointmentSchedule({ selectedDoctor, appointmentData, setAppointmentData }) {
  const [selectedDate, setSelectedDate] = useState(
    appointmentData.date ? new Date(appointmentData.date) : null
  );
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update selectedDate when appointmentData.date changes
  useEffect(() => {
    if (appointmentData.date) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedDate(new Date(appointmentData.date));
    }
  }, [appointmentData.date]);

  // Fetch booked slots for selected date
  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      fetchBookingsByDateAndDoctor(selectedDate, selectedDoctor.id)
        .then((bookings) => {
          const slots = bookings
            .map((booking) => {
              if (booking.visitTime) {
                const time = new Date(booking.visitTime);
                return `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;
              }
              return null;
            })
            .filter(Boolean);
          setBookedSlots(slots);
        })
        .catch(() => setBookedSlots([]))
        .finally(() => setLoading(false));
    } else {
      setBookedSlots([]);
    }
  }, [selectedDate, selectedDoctor]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    setAppointmentData({
      ...appointmentData,
      date: dateString,
      time: "", // Reset time when date changes
    });
  };

  const handleTimeSelect = (time) => {
    setAppointmentData({
      ...appointmentData,
      time: time,
    });
  };

  if (!selectedDoctor) {
    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Please select a doctor first
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            minDate={new Date()}
          />
        </div>

        {/* Time Slots */}
        <div>
          {loading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Loading available slots...
              </p>
            </div>
          ) : (
            <TimeSlots
              clinicHours={selectedDoctor.clinicHours || []}
              selectedDate={selectedDate}
              selectedTime={appointmentData.time}
              onTimeSelect={handleTimeSelect}
              bookedSlots={bookedSlots}
              slotIntervalMinutes={15}
              clinicDurationHours={3}
            />
          )}
        </div>
      </div>

      {/* Selected Date & Time Display */}
      {selectedDate && appointmentData.time && (
        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Selected:</span>{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {appointmentData.time}
          </p>
        </div>
      )}
    </div>
  );
}
