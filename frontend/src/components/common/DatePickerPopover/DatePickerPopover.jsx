import { useRef, useState, useEffect } from "react";
import Calendar from "./Calendar";
import { useOutsideClick } from "./useOutsideClick";

export default function DatePickerPopover({
  value,
  onChange,
  onClose,
  minDate,
}) {
  const ref = useRef();
  const [show, setShow] = useState(false);

  useOutsideClick(ref, () => {
    setShow(false);
    setTimeout(onClose, 150);
  });

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className={`
        absolute top-[calc(100%+28px)] left-1/2 -translate-x-1/2 z-[9999]
        w-[220px] md:w-[280px]
        rounded-[12px] bg-white p-3
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        transition-all duration-200 origin-top
        ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
    >
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white border-l border-t border-gray-100" />

      <Calendar
        selected={value}
        minDate={minDate}
        onSelect={(date) => {
          onChange(date);
          setShow(false);
          setTimeout(onClose, 150);
        }}
      />
    </div>
  );
}
