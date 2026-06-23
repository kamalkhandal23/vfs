import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export const SeatTooltip = ({
  anchorEl,
  category,
  onSelect,
  onClose,
  hoverTimeout,
}) => {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!anchorEl || !tooltipRef.current) return;

    const rect = anchorEl.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const tooltipWidth = tooltipRect.width || 300;
    const tooltipHeight = tooltipRect.height || 230;
    const gap = 6;

    const hasSpaceAbove = rect.top - tooltipHeight - gap >= 10;
    const top = hasSpaceAbove ? rect.top - tooltipHeight - gap : rect.bottom + gap;

    const centeredLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    const left = Math.max(
      10,
      Math.min(centeredLeft, window.innerWidth - tooltipWidth - 10)
    );

    setPosition({ top, left });
  }, [anchorEl]);

  useLayoutEffect(() => {
    if (!anchorEl) return;
    updatePosition();
  }, [anchorEl, category, updatePosition]);

  useEffect(() => {
    if (!anchorEl) return;

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchorEl, updatePosition]);

  if (!anchorEl) return null;

  return createPortal(
    <motion.div
      ref={tooltipRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
      className="w-[300px] rounded-2xl border border-[#c8d5e3] bg-white p-3 shadow-xl"
      onMouseEnter={() => hoverTimeout?.current && clearTimeout(hoverTimeout.current)}
      onMouseLeave={onClose}
    >
      <div className="flex justify-between gap-3">
        <p className="font-semibold">{category.categoryName}</p>
        <p className="whitespace-nowrap font-semibold">Rs {category.fare}</p>
      </div>

      <p className="mt-2 text-xs font-semibold uppercase text-gray-500">
        Includes
      </p>

      <div className="custom-scroll mt-2 max-h-[140px] space-y-1 overflow-y-auto pr-1">
        {(category.amenities?.length
          ? category.amenities
          : ["Standard seating", "Comfortable travel"]
        ).map((amenity) => (
          <div key={amenity} className="flex gap-2 text-sm">
            <span>✓</span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onSelect(category.targetCategoryId)}
        className="mt-3 w-full rounded-lg bg-[#0f2d3a] py-2 text-sm text-white hover:opacity-90"
      >
        Select this class
      </button>
    </motion.div>,
    document.body
  );
};
