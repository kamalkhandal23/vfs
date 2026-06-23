/* eslint-disable react/prop-types */
import { ChevronDown, ChevronUp } from "lucide-react";
import BulkBookingCard from "../../LeftPreview/BulkBookingCard";
import { useState } from "react";

const ClassCard = ({ item, selected, onClick, assignedCount, showDetailsForAgent = false }) => (
  <button
    type="button"
    onClick={() => onClick(item.code)}
    className={`w-full rounded-2xl border p-3 text-left transition ${selected ? "border-[#f59e0b] bg-[#fff8eb]" : "border-[#dde4ee] bg-white hover:border-[#b3c2d5]"
      }`}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-2.5">
        <span className="mt-1 h-8 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.colorHex }} />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold tracking-tight text-[#0d2542]">{item.name}</p>
          <p className="text-xs tracking-wide text-[#617a94]">{item.label}</p>
        </div>
      </div>

      {showDetailsForAgent && <div className="text-right">
        <p className="text-lg font-semibold text-[#0d2542]">Rs {item.price}</p>
        <p className={`text-xs font-medium ${item.available <= 1 ? "text-red-500" : "text-[#5c7288]"}`}>
          {item.available} left
        </p>
      </div>}
    </div>

    {!item.hasMappedLayout ? (
      <p className="mt-2 text-xs font-medium text-amber-700">No seat map is configured for this category yet.</p>
    ) : null}

    {assignedCount > 0 && selected ? (
      <p className="mt-2 text-xs font-medium text-[#9a3412]">All passengers are currently locked to this class.</p>
    ) : null}
  </button>
);

const SeatClassPanel = ({ classes, selectedClassCode, onSelectClass, assignedCount, showDetailsForAgent = false }) => {
  const selectedClass = classes.find((item) => item.code === selectedClassCode) || classes[0];
  const otherClasses = classes.filter((item) => item.code !== selectedClass?.code);
  const [isExpanded, setIsExpanded] = useState(true);


  return (
    <aside className="w-full lg:w-[300px] lg:shrink-0 lg:self-start lg:sticky lg:top-0">
      <div className="space-y-4 rounded-2xl border border-[#c8d5e3] bg-white p-4 lg:max-h-[calc(100vh-130px)] lg:overflow-y-auto custom-scroll">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0d2542]">Selected Class</p>
          {selectedClass ? (
            <div className="mt-2">
              <ClassCard
                item={selectedClass}
                selected
                onClick={onSelectClass}
                assignedCount={assignedCount}
                showDetailsForAgent={showDetailsForAgent}
              />
            </div>
          ) : null}
        </div>

        <div>
          <button
            type="button"
            className="flex w-full items-center justify-between border-t border-[#c8d5e3] pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#304a67]"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            Explore More Classes ({otherClasses.length})
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <div className={`mt-2 space-y-2.5 ${isExpanded ? "block" : "hidden"}`}>
            {otherClasses.map((item) => (
              <ClassCard
                key={item.code}
                item={item}
                selected={false}
                onClick={onSelectClass}
                assignedCount={assignedCount}
                showDetailsForAgent={showDetailsForAgent}
              />
            ))}
          </div>
        </div>
        <BulkBookingCard isCompact />
      </div>
    </aside>
  );
};

export default SeatClassPanel;
