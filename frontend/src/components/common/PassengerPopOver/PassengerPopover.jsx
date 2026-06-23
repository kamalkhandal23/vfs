import { useRef, useState, useEffect } from "react";
import adultsIcon from "../../../assets/icons/adults-icon.svg";
import babyIcon from "../../../assets/icons/baby-icon.svg";
import petIcon from "../../../assets/icons/pet-icon.svg";
import { useOutsideClick } from "../DatePickerPopover/useOutsideClick";

export default function PassengerPopover({ passengers, onChange, onClose }) {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [local, setLocal] = useState(passengers);

  useOutsideClick(ref, () => {
    setShow(false);
    setTimeout(onClose, 150);
  });

  useEffect(() => {
    setShow(true);
  }, []);

  const update = (type, value) => {
    if (type === "adults" && value < 1) return;

    const updated = {
      ...local,
      [type]: Math.max(0, value),
    };

    setLocal(updated);
    onChange(updated);
  };

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className={`
        absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-[9999]
        w-[220px]
        bg-white rounded-[12px]
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        p-3
        transition-all duration-200 origin-top
        ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
    >
      {/* 🔥 top arrow */}
      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white border-l border-t border-gray-100" />

      <CounterRow
        icon={<img src={adultsIcon} alt="" className="h-[18px] w-[18px] object-contain" />}
        label="Adults"
        value={local.adults}
        onChange={(v) => update("adults", v)}
      />

      <CounterRow
        icon={<img src={babyIcon} alt="" className="h-[18px] w-[18px] object-contain" />}
        label="Children"
        value={local.children}
        onChange={(v) => update("children", v)}
      />

      <CounterRow
        icon={<img src={petIcon} alt="" className="h-[18px] w-[18px] object-contain" />}
        label="Pets"
        value={local.pets}
        onChange={(v) => update("pets", v)}
      />

      <button
        onClick={() => {
          setShow(false);
          setTimeout(onClose, 150);
        }}
        className="mt-4 w-full rounded-lg bg-primary-dark py-2 text-sm font-semibold text-white"
      >
        Done
      </button>
    </div>
  );
}

function CounterRow({ icon, label, value, onChange }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-2 last:border-none">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-[14px] font-semibold text-primary-dark">
          {label}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(value - 1);
          }}
          className="flex h-5 w-5 items-center justify-center rounded bg-primary-dark text-xs text-white"
        >
          -
        </button>

        <span className="flex h-5 min-w-[22px] items-center justify-center rounded border border-gray-200 text-[12px]">
          {value}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(value + 1);
          }}
          className="flex h-5 w-5 items-center justify-center rounded bg-primary-dark text-xs text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}
