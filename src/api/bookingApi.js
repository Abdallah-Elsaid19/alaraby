import axios from "axios";

const BOOKING_API_URL = "https://698f98bedcc9a4df204af595.mockapi.io/onlineBooking";

/**
 * Get all bookings
 */
export async function fetchBookings() {
  try {
    const res = await axios.get(BOOKING_API_URL, { cache: "no-store" });
    return res.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

/**
 * Get booking by ID
 */
export async function fetchBookingById(id) {
  try {
    const res = await axios.get(`${BOOKING_API_URL}/${id}`, { cache: "no-store" });
    return res.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}

/**
 * Create a new booking
 */
export async function createBooking(bookingData) {
  try {
    const res = await axios.post(BOOKING_API_URL, bookingData);
    return res.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

/**
 * Update a booking
 */
export async function updateBooking(id, bookingData) {
  try {
    const res = await axios.put(`${BOOKING_API_URL}/${id}`, bookingData);
    return res.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

/**
 * Delete a booking
 */
export async function deleteBooking(id) {
  try {
    const res = await axios.delete(`${BOOKING_API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
}

/**
 * Get bookings by doctor ID
 */
export async function fetchBookingsByDateAndDoctor(date, doctorId) {
  try {
    // جلب كل الحجوزات بدون params
    const res = await axios.get(BOOKING_API_URL, { cache: "no-store" });
    const bookings = res.data || [];

    // فلترة حسب doctorId
    let filtered = bookings;
    if (doctorId) {
      filtered = filtered.filter(
        (booking) => booking.doctorId === doctorId || booking.doctor?.id === doctorId
      );
    }

    // فلترة حسب التاريخ
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      filtered = filtered.filter((booking) => {
        if (!booking.visitTime) return false;
        const bookingDate = new Date(booking.visitTime).toISOString().split("T")[0];
        return bookingDate === formattedDate;
      });
    }

    return filtered;
  } catch (error) {
    console.error("Error fetching bookings by date and doctor:", error);
    return [];
  }
}
