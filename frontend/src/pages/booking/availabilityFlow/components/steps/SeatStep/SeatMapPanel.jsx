/* eslint-disable react/prop-types */
import SeatSmartTooltip from "./SeatSmartTooltip";

const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== "string") return `rgba(15,41,66,${alpha})`;
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return `rgba(15,41,66,${alpha})`;

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SeatLegend = ({ colorHex }) => (
  <div className="flex flex-wrap justify-center gap-4 pt-3 text-xs text-[#4f6680]">
    <span className="inline-flex items-center gap-1.5"><i className="h-3 w-3 rounded-full" style={{ backgroundColor: colorHex }} />Available</span>
    <span className="inline-flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-[#22c55e]" />Selected</span>
    <span className="inline-flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-[#e2e8f0]" />Occupied</span>
    <span className="inline-flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-[#a78bfa]" />Other Pax</span>
    <span className="inline-flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-[#fef3c7]" />Blocked</span>
  </div>
);

const SeatSvg = ({ label, state, colorHex, onClick, seatType, price }) => {
  const isDisabled = state === "occupied" || state === "other_pax" || state === "blocked";
  const statusLabel = {
    available: "Available",
    selected: "Selected",
    occupied: "Occupied",
    other_pax: "Assigned to another passenger",
    blocked: "Blocked",
  };
  const stateStyles = {
    available: {
      fill: colorHex,
      stroke: colorHex,
      fillOpacity: 0.75,
      textColor: "#ffffff",
    },
    selected: {
      fill: "#34d399",
      stroke: "#10b981",
      fillOpacity: 1,
      textColor: "#ffffff",
    },
    occupied: {
      fill: "#eef2f7",
      stroke: "#d3dee9",
      fillOpacity: 1,
      textColor: "#ffffff",
    },
    other_pax: {
      fill: "#ddd6fe",
      stroke: "#a78bfa",
      fillOpacity: 1,
      textColor: "#ffffff",
    },
    blocked: {
      fill: "#fef3c7",
      stroke: "#f59e0b",
      fillOpacity: 1,
      textColor: "#ffffff",
    },
  };

  const seatStyle = stateStyles[state] || stateStyles.available;

  return (
    <div className="h-8 w-7 md:h-9 md:w-8">
      <SeatSmartTooltip
        placement="top"
        maxWidth={180}
        content={(
          <>
            <p className="font-semibold text-[#0f2942]">Seat {label}</p>
            <p className="mt-0.5 text-[#4f6680]">Status: {statusLabel[state] || statusLabel.available}</p>
            <p className="mt-0.5 text-[#4f6680]">Type: {seatType}</p>
            <p className="mt-0.5 font-semibold text-[#0f2942]">Price: Rs {price}</p>
          </>
        )}
      >
        <button
          type="button"
          onClick={() => {
            if (isDisabled) return;
            onClick();
          }}
          aria-disabled={isDisabled}
          className={`h-8 w-7 shrink-0 transition-transform duration-100 md:h-9 md:w-8 ${
            isDisabled ? "cursor-not-allowed" : "hover:scale-110"
          }`}
          aria-label={`Seat ${label}`}
        >
          <svg viewBox="-2 -6 44 52" className="h-full w-full" role="button" aria-label={`Seat ${label}`}>
            <path
              d="M6,4 Q6,0 10,0 L30,0 Q34,0 34,4 L34,14 Q34,17 31,18 L9,18 Q6,17 6,14 Z"
              fill={seatStyle.fill}
              fillOpacity={seatStyle.fillOpacity}
              stroke={seatStyle.stroke}
              strokeWidth="1.2"
            />
            <path
              d="M4,20 Q4,17 8,17 L32,17 Q36,17 36,20 L36,32 Q36,36 32,36 L8,36 Q4,36 4,32 Z"
              fill={seatStyle.fill}
              fillOpacity={seatStyle.fillOpacity}
              stroke={seatStyle.stroke}
              strokeWidth="1.2"
            />
            <path
              d="M1,17 Q0,17 0,18 L0,34 Q0,36 2,36 L4,36 L4,17 Z"
              fill={seatStyle.fill}
              fillOpacity={seatStyle.fillOpacity}
              stroke={seatStyle.stroke}
              strokeWidth="0.8"
              opacity="0.55"
            />
            <path
              d="M36,17 L38,17 Q40,17 40,18 L40,34 Q40,36 38,36 L36,36 Z"
              fill={seatStyle.fill}
              fillOpacity={seatStyle.fillOpacity}
              stroke={seatStyle.stroke}
              strokeWidth="0.8"
              opacity="0.55"
            />
            <text
              x="20"
              y="29"
              textAnchor="middle"
              fontSize="9"
              fill={seatStyle.textColor}
              fontWeight="700"
            >
              {state === "selected" ? "✓" : label}
            </text>
          </svg>
        </button>
      </SeatSmartTooltip>
    </div>
  );
};

const SeatMapPanel = ({
  selectedClass,
  onSeatClick,
}) => {
  if (!selectedClass) {
    return null;
  }

  const maxSlotCount = Math.max(...(selectedClass?.layout?.rows || []).map((row) => row.slots.length), 1);

  const classTintBg = hexToRgba(selectedClass.colorHex, 0.12);
  const classTintBorder = hexToRgba(selectedClass.colorHex, 0.55);
  const classTintSoft = hexToRgba(selectedClass.colorHex, 0.08);

  return (
    <section className="min-w-0 flex-1 space-y-3 rounded-2xl border border-[#c8d5e3] bg-white p-4 sm:p-5">
      <div
        className="rounded-2xl border border-[#c8d5e3] p-4"
        style={{
          backgroundColor: classTintBg,
          boxShadow: `inset 3px 0 0 ${selectedClass.colorHex}`,
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-semibold tracking-tight text-[#0f172a]">{selectedClass.name}</p>
            <p className="text-sm text-[#415a74]">{selectedClass.tier} | {selectedClass.deckSection} | {selectedClass.label}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-[#f97316]">Rs {selectedClass.price}</p>
            {/* <p className="text-xs font-medium text-[#6b7280]">{selectedClass.available} available</p> */}
            {selectedClass.isGroupedEconomy ? (
              <p className="text-[11px] text-[#64748b]">Base fare. Seat surcharge shown in tooltip.</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#dce5f1] p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-[#4b617a]">
          <span>{selectedClass.layout.portLabel}</span>
          <span className="font-semibold" style={{ color: selectedClass.colorHex }}>{selectedClass.sectionLabel}</span>
          <span>{selectedClass.layout.starboardLabel}</span>
        </div>

        {selectedClass.layout.rows?.length ? (
          <div className="space-y-2 overflow-x-auto overflow-y-visible custom-scroll pb-1">
            {(selectedClass.layout.rows || []).map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <div className="w-3 text-xs font-semibold text-[#475569]">{row.label}</div>
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${maxSlotCount}, minmax(0, 1fr))` }}
              >
                {row.slots.map((slot, index) => {
                  if (!slot) {
                    return <span key={`${row.label}-empty-${index}`} className="h-8 w-7 md:h-9 md:w-8" />;
                  }

                  const nonNullIndexes = row.slots
                    .map((seatItem, seatIndex) => (seatItem ? seatIndex : -1))
                    .filter((seatIndex) => seatIndex !== -1);

                  const firstSeatIndex = nonNullIndexes[0];
                  const lastSeatIndex = nonNullIndexes[nonNullIndexes.length - 1];

                  return (
                    <SeatSvg
                      key={slot.seatId}
                      label={slot.seatId}
                      state={slot.state}
                      colorHex={selectedClass.colorHex}
                      seatType={index === firstSeatIndex || index === lastSeatIndex ? "Window" : "Aisle"}
                      price={slot.price ?? selectedClass.price}
                      onClick={() => onSeatClick({
                        rowLabel: row.label,
                        colNum: index + 1,
                        seatId: slot.seatId,
                        state: slot.state,
                        price: slot.price ?? selectedClass.price,
                        surcharge: slot.surcharge ?? 0,
                        pricingLevel: slot.pricingLevel,
                        apiCategoryId: slot.apiCategoryId ?? selectedClass.apiCategoryId,
                        apiCategoryName: slot.apiCategoryName ?? selectedClass.name,
                      })}
                    />
                  );
                })}
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#dce5f1] px-4 py-10 text-center text-sm text-[#64748b]">
            No seat layout is mapped for this category yet.
          </div>
        )}

        <SeatLegend colorHex={selectedClass.colorHex} />
      </div>
    </section>
  );
};

export default SeatMapPanel;
