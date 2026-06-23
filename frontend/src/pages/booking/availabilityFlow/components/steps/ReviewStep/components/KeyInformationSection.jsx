import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  AlertCircle,
  ShieldCheck,
  Dog,
  ParkingCircle,
  Ship,
  Luggage,
  Ticket,
  Utensils,
  CigaretteOff,
  Ban,
} from "lucide-react";

import { KEY_INFORMATION } from "../../../../config/confirmContent";

const ICON_MAP = {
  Clock,
  AlertCircle,
  ShieldCheck,
  Dog,
  ParkingCircle,
  Ship,
  Luggage,
  Ticket,
  Utensils,
  CigaretteOff,
  Ban,
};

const KeyInformationSection = () => {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded
    ? KEY_INFORMATION
    : KEY_INFORMATION.slice(0, 2);

  return (
    <div className="rounded-2xl border border-[#c8d5e3] bg-white overflow-hidden shadow-sm">

      {/* Header */}
      <div className="px-5 py-4 border-b border-[#c8d5e3] flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck size={18} className="text-gray-600" />
          <span>Key Information</span>
          <span className="text-[11px] bg-red-100 text-red-500 px-2 py-0.5 rounded-md">
            MUST READ
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="relative px-5 py-4 space-y-3">

        {visibleItems.map((item, i) => {
          const Icon = ICON_MAP[item.icon];

          if (item.type === "warning") {
            return (
              <div
                key={i}
                className="flex gap-3 bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm"
              >
                <Icon size={18} className="text-orange-500 mt-[2px]" />
                <p>{item.text}</p>
              </div>
            );
          }

          return (
            <div key={i} className="flex gap-3 text-sm text-gray-600">
              <Icon size={18} className="mt-[2px]" />
              <p>{item.text}</p>
            </div>
          );
        })}

        {/* Gradient fade when collapsed */}
        {!expanded && KEY_INFORMATION.length > 2 && (
          <div className="absolute bottom-12 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}

        {/* Modern Toggle */}
        {KEY_INFORMATION.length > 2 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-[#c8d5e3] bg-gray-50 hover:bg-gray-100 transition"
            >
              {expanded ? "Show less" : "View all information"}
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(KeyInformationSection);
