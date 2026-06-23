/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useClickOutside from "../../hooks/useClickOutside";

/**
 * Compact label-prefix dropdown that renders as: [LABEL: Selected Value ▾]
 *
 * Props:
 *  - label    {string}              prefix label shown in small caps (e.g. "ROUTE", "FERRY")
 *  - value    {string}              currently selected option id
 *  - options  {Array<{id, name}>}   list of selectable options
 *  - onChange {(id: string) => void} called with the selected option id
 */
export default function LabelDropdown({ label, value, options = [], onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useClickOutside(containerRef, () => setOpen(false));

  const selected = options.find((o) => String(o.id) === String(value));
  // Strip trailing "(Ferry Name)" parenthetical to keep route labels concise
  const displayName = (selected?.name || "All").replace(/\s*\(.*\)$/, "");

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          flex items-center gap-1.5
          px-3 py-[6px]
          rounded-lg border border-gray-200
          bg-white hover:bg-gray-50
          transition-colors duration-150
          shadow-sm
          select-none
        "
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex-shrink-0">
          {label} :
        </span>
        <span className="text-sm font-semibold text-[#0f2d3a] max-w-[140px] truncate">
          {displayName}
        </span>
        <ChevronDown
          size={12}
          className={`text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="
              absolute top-full left-0 mt-1.5
              bg-white
              border border-gray-200
              rounded-xl
              shadow-lg
              z-50
              min-w-[180px]
              py-1
              overflow-hidden
            "
          >
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onChange(String(opt.id));
                setOpen(false);
              }}
              className={`
                w-full text-left
                px-4 py-2
                text-sm
                transition-colors duration-100
                ${
                  String(opt.id) === String(value)
                    ? "bg-[#eaf4f7] text-[#1b6983] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {opt.name}
            </button>
          ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
