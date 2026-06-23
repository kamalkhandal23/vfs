import { useMemo, useState } from "react";

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Calendar({ selected, onSelect, minDate }) {
  const minSelectableDate = useMemo(() => {
    const today = startOfDay(new Date());
    if (!minDate) return today;

    const normalizedMinDate = startOfDay(new Date(minDate));
    return normalizedMinDate > today ? normalizedMinDate : today;
  }, [minDate]);

  const [currentDate, setCurrentDate] = useState(
    selected ? new Date(selected) : minSelectableDate
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const minMonthDate = new Date(
    minSelectableDate.getFullYear(),
    minSelectableDate.getMonth(),
    1
  );
  const currentMonthDate = new Date(year, month, 1);
  const canGoToPreviousMonth = currentMonthDate > minMonthDate;

  const handleSelect = (day) => {
    const fullDate = new Date(year, month, day, 12);
    onSelect(fullDate.toISOString());
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (!canGoToPreviousMonth) return;
            setCurrentDate(new Date(year, month - 1, 1));
          }}
          disabled={!canGoToPreviousMonth}
          className="rounded px-2 py-1 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
        >
          &#9664;
        </button>

        <h3 className="text-sm font-semibold">
          {monthName} {year}
        </h3>

        <button
          type="button"
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
          className="rounded px-2 py-1 text-sm hover:bg-gray-100"
        >
          &#9654;
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-xs text-gray-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((dayLabel) => (
          <div key={dayLabel} className="text-center">
            {dayLabel}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const date = new Date(year, month, day);
          const dateKey = getLocalDateKey(date);
          const selectedKey = selected ? getLocalDateKey(new Date(selected)) : null;
          const isSelected = selectedKey === dateKey;
          const isBeforeMinDate = startOfDay(date) < minSelectableDate;

          return (
            <button
              type="button"
              key={day}
              onClick={() => handleSelect(day)}
              disabled={isBeforeMinDate}
              className={`
                flex h-8 w-8 items-center justify-center rounded-md text-sm transition
                ${isSelected ? "bg-primary text-white" : ""}
                ${isBeforeMinDate ? "cursor-not-allowed text-gray-300" : "hover:bg-primary-dark"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
