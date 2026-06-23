import React, { useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useOutsideClick } from "../../components/common/DatePickerPopover/useOutsideClick";

export default function CityDropdown({
  value,
  options,
  onChange,
  onClose,
  open,
  setOpen,
  otherValue,
}) {
  const ref = useRef(null);

  // FIXED OUTSIDE CLICK
  useOutsideClick(ref, () => {
    setOpen(false);
    onClose?.();
  });

  // SELECT HANDLER
  const handleSelect = useCallback(
    (city) => {
      if (city === value) return;
      onChange(city);
      setOpen(false);
      onClose?.();
    },
    [onChange, setOpen, onClose, value]
  );

  // ANIMATION
  const dropdownAnim =
    "transition-all duration-200 ease-out opacity-100 scale-100 translate-y-1";

  return (
    <div className="relative select-none z-[9999]" ref={ref}>

      {/* BUTTON */}
      <button
        type="button"
        className="flex flex-col items-center justify-center w-full bg-transparent border-none focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation(); // IMPORTANT
          setOpen((prev) => !prev);
        }}
      >
        <span className="font-semibold text-primary-dark text-[16px] md:max-lg:text-[13px]">
          {value}
        </span>

        <ChevronDown
          className={`mt-1 h-3 w-3 text-primary-dark/70 transition-all duration-200 ${open ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className={`
            absolute top-[calc(100%+26px)] left-1/2 
            -translate-x-1/2 z-[9999]
            ${dropdownAnim}
          `}
        >
          {/*  ARROW FIXED */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rotate-45 bg-white border-l border-t border-gray-100" />

          {/* CARD */}
          <ul
            className="
              relative w-[180px]
              rounded-[12px] bg-white p-2
              shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              ring-1 ring-black/5
            "
            role="listbox"
          >
            {options.map((city) => {
              const isDisabled = city === otherValue;

              return (
                <li
                  key={city}
                  className={`
        rounded-lg px-3 py-1 text-[14px] font-medium transition-all duration-200
        ${city === value
                      ? "bg-primary-dark text-white"
                      : isDisabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer text-gray-900 hover:bg-gray-100"
                    }
      `}
                  aria-selected={city === value}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isDisabled) return;
                    handleSelect(city);
                  }}
                  tabIndex={isDisabled ? -1 : 0}
                >
                  {city}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}