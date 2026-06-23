import { isPastDate, isTodayDate } from "./DateUtils";

export const getMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days = [];

  /* ===============================
     LEADING PADDING
  =============================== */
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push({
      isPadding: true,
      isCurrentMonth: false,
    });
  }

  /* ===============================
     CURRENT MONTH DAYS
  =============================== */
  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    days.push({
      day,
      fullDate,
      isPadding: false,
      isCurrentMonth: true,
    });
  }

  /* ===============================
     TRAILING PADDING (ONLY COMPLETE LAST ROW)
  =============================== */
  while (days.length % 7 !== 0) {
    days.push({
      isPadding: true,
      isCurrentMonth: false,
    });
  }

  return days;
};



export function canGoToPrevMonth(currentDate) {
  const today = new Date();

  const currentMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const realMonthStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  return currentMonthStart > realMonthStart;
}


export function getSeatAvailabilityStatus(slot) {
  if (!slot?.categories?.length) return "NOT_AVAILABLE";

  const totalSeats = slot.categories.reduce(
    (sum, cat) => sum + (cat.availableSeats || 0),
    0
  );

  const maxSeats = slot.categories.reduce(
    (sum, cat) => sum + (cat.availableSeats + 0), // API doesn't give total seats
    0
  );

  if (totalSeats === 0) return "BOOKED";

  const ratio = totalSeats / maxSeats;

  if (ratio <= 0.1) return "FILLING_FAST";
  if (ratio <= 0.4) return "FILLING_FAST";

  return "AVAILABLE";
}


export function checkSlotExpired(slot, date, currentMinutes) {
  if (isPastDate(date)) return true;

  if (isTodayDate(date)) {
    const [h, m] = slot.departureTime.split(":").map(Number);
    const slotMinutes = h * 60 + m;
    return slotMinutes <= currentMinutes;
  }

  return false;
}