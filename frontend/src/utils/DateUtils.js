// src/utils/formatDate.js

export const toDate = (value) => {
  if (!value) return null;

  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};
// Example: "Mon, 29 Sep 2025"
export function formatDate(date, options) {
  if (!date) return "-";
  const d = new Date(date);
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options,
  }).format(d);
}

export const getMonthName = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("en-IN", {
    month: "short", // or "long"
  });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date)) return "Invalid Date";

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

// Example: "Mon, 29 Sep 2025"
export const formatLocalDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


export const formatOnlyDate = (dateStr) => {
  if (!dateStr) return "N/A";

  const date = new Date(dateStr);
  if (isNaN(date)) return "Invalid Date";

  const month = date.getMonth() + 1; // months are 0-based
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`; // e.g. 9/29/2025
};

export const formatDateParts = (date) => {
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

  const d = new Date(date);

  return {
    day: d.getDate(),
    month: monthNames[d.getMonth()],
    weekday: weekDays[d.getDay()]
  };
};



// Utility: Get week range
export const getWeekRange = (type) => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (type === "this_week") {
    // Monday to Sunday this week
    const day = now.getDay(); // 0 = Sunday
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    start.setDate(now.getDate() + diffToMonday);
    start.setHours(0, 0, 0, 0);

    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (type === "next_week") {
    // Next week Monday → Sunday
    const day = now.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day;
    start.setDate(now.getDate() + diffToMonday + 7);
    start.setHours(0, 0, 0, 0);

    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  }

  return { from: start, to: end };
};



const now = new Date();
// Example: "Mon, 29 Sep 2025"
export const formattedDate = now.toLocaleDateString("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const formattedTime = now.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});



// ✅ Returns "2025-2026" automatically
export const getCurrentFinancialYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 0-based

  // FY starts in April
  if (month >= 4) {
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
};

export const getLastThreeYears = () => {
  const years = [];
  const today = new Date();
  let fyStartYear = today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
  for (let i = 0; i < 3; i++) {
    const start = fyStartYear - i;
    years.push(`${start}-${start + 1}`);
  }
  return years;
};

// Example: ["2023-2024", "2022-2023", "2021-2022"]


export const getCurrentMonthDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
};

export const getLastMonthDate = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() - 1, 1);
};

export const getMonthYearParams = (date) => {
  return {
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: date.getFullYear(),
  };
};

export const isLessThanOneHour = (addedDate) => {
  if (!addedDate) return false;

  const added = new Date(addedDate).getTime();
  const now = Date.now();

  const diffMs = now - added;

  if (diffMs < 0) return false;
  return diffMs < 3600000;
};


export const formatMinutes = (minutes) => {
  if (minutes == null || minutes <= 0) return "--";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) return `${hours}h`;
  if (hours === 0) return `${mins}m`;

  return `${hours}h ${mins}m`;
};

const MAX_RANGE_DAYS = 30;

export const isRangeWithinLimit = (start, end) => {
  if (!start || !end) return true;
  const diffInDays =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays <= MAX_RANGE_DAYS;
};

export const getLocalDateTimeString = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};


export const isTodayOrFuture = (date) => {
  if (!date) return false;

  const input = new Date(date);
  if (isNaN(input.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  input.setHours(0, 0, 0, 0);

  return input >= today;
};


export const isToday = (dateString) => {
  if (!dateString) return false;

  const today = new Date();
  const selected = new Date(dateString);

  return (
    today.getFullYear() === selected.getFullYear() &&
    today.getMonth() === selected.getMonth() &&
    today.getDate() === selected.getDate()
  );
};



export const formatBookingDateTime = (value) => {
  const date = toDate(value);
  if (!date) return "-";

  const datePart = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${datePart}  ${timePart}`;
};



/* -------------------------------------------------------------------------- */
/* 🏢 Enterprise Date Lock Utilities                                          */
/* -------------------------------------------------------------------------- */

/**
 * Normalize date to start of day (removes time component)
 */
export const normalizeDate = (value) => {
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;

  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Returns true if date is strictly in the past (before today)
 */
export const isPastDate = (value) => {
  const input = normalizeDate(value);
  if (!input) return false;

  const today = normalizeDate(new Date());
  return input < today;
};

/**
 * Returns true if date is today
 */
export const isTodayDate = (value) => {
  const input = normalizeDate(value);
  if (!input) return false;

  const today = normalizeDate(new Date());
  return input.getTime() === today.getTime();
};

/**
 * Enterprise Lock Rule
 * FULL_DAY → Past + Today locked
 * PAST_ONLY → Only past locked
 */
export const isDateLocked = (value, mode = "FULL_DAY") => {
  const input = normalizeDate(value);
  if (!input) return true;

  const today = normalizeDate(new Date());

  if (mode === "PAST_ONLY") {
    return input < today;
  }

  // Default: FULL_DAY (enterprise safe)
  return input <= today;
};




/** Format "06:00" → "6:00 AM" */
export const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
};

export const parseTimeToMinutes = (timeValue) => {
  if (!timeValue || typeof timeValue !== "string") return null;

  const text = timeValue.trim().toUpperCase();
  const meridiemMatch = text.match(/(AM|PM)$/);

  if (meridiemMatch) {
    const clean = text.replace(/\s*(AM|PM)$/, "").trim();
    const [hRaw, mRaw] = clean.split(":").map((n) => Number(n));
    if (Number.isNaN(hRaw) || Number.isNaN(mRaw)) return null;

    let hours = hRaw;
    if (meridiemMatch[1] === "PM" && hours !== 12) hours += 12;
    if (meridiemMatch[1] === "AM" && hours === 12) hours = 0;
    return hours * 60 + mRaw;
  }

  const [hRaw, mRaw] = text.split(":").map((n) => Number(n));
  if (Number.isNaN(hRaw) || Number.isNaN(mRaw)) return null;
  return hRaw * 60 + mRaw;
};



export const isFutureOrTodaySlot = (row) => {
  const now = new Date();
  const sailingDate = new Date(row.onwardDateTime);
  // If not today, allow all future dates
  if (
    sailingDate.getFullYear() > now.getFullYear() ||
    (sailingDate.getFullYear() === now.getFullYear() && sailingDate.getMonth() > now.getMonth()) ||
    (sailingDate.getFullYear() === now.getFullYear() && sailingDate.getMonth() === now.getMonth() && sailingDate.getDate() > now.getDate())
  ) {
    return true;
  }
  // If today, allow only future time slots
  if (
    sailingDate.getFullYear() === now.getFullYear() &&
    sailingDate.getMonth() === now.getMonth() &&
    sailingDate.getDate() === now.getDate()
  ) {
    return sailingDate.getTime() >= now.getTime();
  }
  // Otherwise, it's in the past
  return false;
};


export const getDuration = (departure, arrival) => {
  if (!departure || !arrival) return "--";

  const [depH, depM] = departure.split(":").map(Number);
  const [arrH, arrM] = arrival.split(":").map(Number);

  let depMinutes = depH * 60 + depM;
  let arrMinutes = arrH * 60 + arrM;

  // handle next-day arrival (important edge case)
  if (arrMinutes < depMinutes) {
    arrMinutes += 24 * 60;
  }

  const diff = arrMinutes - depMinutes;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  if (minutes === 0) return `${hours}h`;
  if (hours === 0) return `${minutes}m`;

  return `${hours}h ${minutes}m`;
};

export const getArrivalByDuration = (departureTime, durationMinutes, includeSeconds = true) => {
  const baseMinutes = parseTimeToMinutes(departureTime);
  const duration = Number(durationMinutes);

  if (baseMinutes == null || Number.isNaN(duration)) return "--";

  const minutesInDay = 24 * 60;
  const arrivalMinutes = ((baseMinutes + duration) % minutesInDay + minutesInDay) % minutesInDay;
  const h = Math.floor(arrivalMinutes / 60);
  const m = arrivalMinutes % 60;
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");

  return includeSeconds ? `${hh}:${mm}:00` : `${hh}:${mm}`;
};