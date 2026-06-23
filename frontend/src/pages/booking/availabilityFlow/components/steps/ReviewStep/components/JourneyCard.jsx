/* eslint-disable react/prop-types */
import React from "react";

const formatTo12Hour = (timeValue) => {
  if (!timeValue || typeof timeValue !== "string") return "--";

  const text = timeValue.trim();
  if (/(AM|PM)$/i.test(text)) return text.toUpperCase();

  const [hRaw, mRaw] = text.split(":").map(Number);
  if (Number.isNaN(hRaw) || Number.isNaN(mRaw)) return text;

  const hours12 = ((hRaw + 11) % 12) + 1;
  const suffix = hRaw >= 12 ? "PM" : "AM";
  return `${hours12}:${String(mRaw).padStart(2, "0")} ${suffix}`;
};

const JourneyCard = ({ summary, label }) => {
  const { journey = {}, date, ferryName } = summary || {};

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#c8d5e3] bg-white">
      <div className="px-4 py-3.5 sm:px-5 sm:py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#264a6d]">
          {label ?? "Journey"}
        </p>

        <div className="mt-2.5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:mt-3 sm:gap-2.5">
          <div className="min-w-0">
            <p className="whitespace-nowrap text-2xl font-bold tracking-tight text-[#061b3a] sm:text-3xl">{formatTo12Hour(journey.departureTime)}</p>
            <p className="mt-1 truncate text-[1rem] font-semibold leading-none text-[#061b3a] sm:text-[1.1rem] lg:text-[1.2rem]">{journey.from || "--"}</p>
          </div>

          <div className="flex min-w-[120px] items-center gap-2 px-1 text-[#9eb1c6] sm:min-w-[155px] sm:gap-2 sm:px-2 lg:min-w-[190px]">
            <div className="h-px flex-1 bg-[#cbd7e3]" />
            <span className="text-xs font-medium">1h</span>
            <div className="h-px flex-1 bg-[#cbd7e3]" />
          </div>

          <div className="min-w-0 text-right">
            <p className="whitespace-nowrap text-2xl font-bold tracking-tight text-[#061b3a] sm:text-3xl">{formatTo12Hour(journey.arrivalTime)}</p>
            <p className="mt-1 truncate text-[1rem] font-semibold leading-none text-[#061b3a] sm:text-[1.1rem] lg:text-[1.2rem]">{journey.to || "--"}</p>
          </div>
        </div>

        <p className="mt-2.5 text-sm text-[#466487] sm:mt-3 sm:text-base">
          {date || "--"} · {ferryName || "--"}
        </p>
      </div>
    </div>
  );
};

export default React.memo(JourneyCard);
