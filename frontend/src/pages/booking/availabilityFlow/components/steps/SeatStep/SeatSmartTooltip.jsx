/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SeatSmartTooltip = ({ content, children, placement = "top", offset = 10, maxWidth = 180 }) => {
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, placement: "top" });

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;

    const padding = 8;

    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tipRect = tooltipRef.current.getBoundingClientRect();

      let finalPlacement = placement;
      let top = triggerRect.top - tipRect.height - offset;
      let left = triggerRect.left + triggerRect.width / 2 - tipRect.width / 2;

      if (placement === "bottom") {
        top = triggerRect.bottom + offset;
      }

      if (finalPlacement === "top" && top < padding) {
        finalPlacement = "bottom";
        top = triggerRect.bottom + offset;
      } else if (finalPlacement === "bottom" && top + tipRect.height > window.innerHeight - padding) {
        finalPlacement = "top";
        top = triggerRect.top - tipRect.height - offset;
      }

      left = Math.min(
        Math.max(left, padding),
        window.innerWidth - tipRect.width - padding
      );

      top = Math.min(
        Math.max(top, padding),
        window.innerHeight - tipRect.height - padding
      );

      setPosition({ top, left, placement: finalPlacement });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [visible, placement, offset, content]);

  if (!content) {
    return children;
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      >
        {children}
      </span>

      {visible && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={tooltipRef}
              role="tooltip"
              style={{
                position: "fixed",
                top: position.top,
                left: position.left,
                zIndex: 9999,
                maxWidth,
              }}
              className="pointer-events-none rounded-lg border border-[#d8e0ea] bg-white p-2 text-[11px] shadow-[0_8px_20px_rgba(7,28,61,0.18)]"
            >
              {content}
              <span
                aria-hidden="true"
                className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-[#d8e0ea] bg-white ${
                  position.placement === "top"
                    ? "-bottom-1 border-b border-r"
                    : "-top-1 border-l border-t"
                }`}
              />
            </div>,
            document.body
          )
        : null}
    </>
  );
};

export default SeatSmartTooltip;
