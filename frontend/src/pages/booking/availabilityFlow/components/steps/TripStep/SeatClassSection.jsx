/* eslint-disable react/prop-types */
import { useMemo, useRef, useState } from "react";
import { Check, Info, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDynamicSeatCategories,
  selectDynamicReturnSeatCategories,
  selectSelectedCategoryId,
  selectReturnCategoryId,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";
import {
  setCategory,
  setReturnCategory,
} from "../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import { AnimatePresence } from "framer-motion";
import { SeatTooltip } from "./SeatTooltip";

const SeatClassSection = ({ isReturn = false }) => {
  const dispatch = useDispatch();

  const departureCategories = useSelector(selectDynamicSeatCategories);
  const departureCategoryId = useSelector(selectSelectedCategoryId);
  const returnCategories = useSelector(selectDynamicReturnSeatCategories);
  const returnCategoryId = useSelector(selectReturnCategoryId);

  const categories = isReturn ? returnCategories : departureCategories;
  const selectedCategoryId = isReturn ? returnCategoryId : departureCategoryId;
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const hoverTimeout = useRef(null);

  const handleSelect = (categoryId) => {
    if (categoryId == null) return;
    dispatch(isReturn ? setReturnCategory(categoryId) : setCategory(categoryId));
  };

  const normalizedCategories = useMemo(
    () => (categories || []).map((category) => ({
      code: category.code,
      categoryId: category.apiCategoryId,
      categoryName: category.name,
      fare: category.basePrice,
      availableSeats: category.available,
      apiCategoryIds: category.apiCategoryIds ?? [category.apiCategoryId],
      targetCategoryId: category.apiCategoryIds?.[0] ?? category.apiCategoryId ?? category.categoryId,
      amenities: category.amenities ?? [],
      specs: category.specs,
      isGroupedEconomy: Boolean(category.isGroupedEconomy),
      deckSection: category.deckSection,
      tier: category.tier,
    })),
    [categories]
  );

  const selectedCategory = normalizedCategories.find((category) =>
    category.apiCategoryIds.includes(selectedCategoryId)
  ) ?? normalizedCategories[0] ?? null;

  // const hoveredCategory = normalizedCategories.find((category) => category.code === hoveredCode) ?? null;
  const detailCategory = hoveredCategory ?? selectedCategory;

  if (!normalizedCategories.length) return null;

  return (
    <section className="space-y-2 sm:space-y-2.5">
      <div className="flex items-center gap-3 text-[#071c3d]">
        <Users size={16} />
        <h3 className="text-[1.05rem] font-semibold tracking-tight sm:text-[1.12rem]">Seat Class</h3>
      </div>

      <div className="grid gap-2 md:grid-cols-4">
        {normalizedCategories.map((category, index) => {
          const selectedIds = category.apiCategoryIds;
          const isSelected = selectedIds.includes(selectedCategoryId);
          const isSoldOut = category.availableSeats === 0;
          const isRecommended = index === normalizedCategories.length - 1;
          // const isHovered = hoveredCode === category.code;
          // const alignRight = index === normalizedCategories.length - 1;

          return (
            <div
              key={category.code}
              onMouseEnter={(e) => {
                clearTimeout(hoverTimeout.current);

                setAnchorEl(e.currentTarget);
                setHoveredCategory(category);
              }}

              onMouseLeave={() => {
                hoverTimeout.current = setTimeout(() => {
                  setAnchorEl(null);
                  setHoveredCategory(null);
                }, 120); // small delay = smooth UX
              }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => !isSoldOut && handleSelect(category.targetCategoryId)}
                disabled={isSoldOut}
                className={`relative min-h-[136px] w-full rounded-xl border-2 bg-white p-2.5 text-left transition-all duration-200 ease-out ${isSelected
                  ? "border-[var(--booking-primary)] shadow-[0_4px_12px_rgba(15,45,58,0.08)]"
                  : "border-[#c8d5e3] hover:border-[#9eb2c7] hover:shadow-[0_2px_8px_rgba(15,45,58,0.06)]"
                  } ${isSoldOut ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                {isRecommended ? (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-[#22c55e] px-3 py-[3px] text-[10px] font-semibold tracking-wide text-white">
                    RECOMMENDED
                  </span>
                ) : null}

                <div className="flex items-center gap-1.5">
                  <div className="flex h-5 w-5 items-center justify-center">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white transition-colors duration-200 ${isSelected ? "border-[var(--booking-primary)]" : "border-[#b7c3d1]"
                        }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${isSelected ? "scale-100 bg-[var(--booking-primary)] opacity-100" : "scale-75 bg-transparent opacity-0"
                          }`}
                      />
                    </span>
                  </div>
                  <p className="text-[0.88rem] font-semibold uppercase tracking-wide text-[var(--booking-primary)] sm:text-[0.94rem]">
                    {category.categoryName}
                  </p>
                </div>

                <div className="mt-1.5 flex items-end gap-1 text-[var(--booking-primary)]">
                  <span className="text-[1.42rem] font-semibold leading-none sm:text-[1.56rem]">₹ {category.fare}</span>
                  <span className="pb-1 text-[0.76rem] text-[#6b8299] sm:text-[0.82rem]">/ pax</span>
                </div>

                <p className="mt-3 inline-flex items-center gap-1 text-[0.72rem] font-medium text-[#7f93a7] sm:text-[0.75rem]">
                  <Info size={13} />
                  {isSoldOut ? "Sold out for this sailing" : "Hover to see inclusions"}
                </p>

                {isSoldOut ? (
                  <span className="absolute right-4 top-4 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-600">
                    Sold Out
                  </span>
                ) : null}
              </button>

              {/* Desktop hover details: absolute, not fixed */}
              {/* {isHovered && !isSoldOut ? (
                <div
                  onMouseEnter={() => setHoveredCode(category.code)}
                  onMouseLeave={() => setHoveredCode(null)}
                  className={`absolute top-full z-30 mt-2 hidden w-[280px] rounded-2xl border border-[#c8d5e3] bg-white p-3 shadow-[0_10px_22px_rgba(15,45,58,0.12)] md:block lg:w-[300px] ${alignRight ? "right-0" : "left-0"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[0.88rem] font-semibold uppercase text-[#071c3d]">{category.categoryName}</p>
                    <div className="text-right flex items-end gap-1">
                      <p className="text-[1.45rem] font-semibold leading-none text-[#071c3d]">₹ {category.fare}</p>
                      <p className="text-[0.72rem] text-[#6b8299]">/ pax</p>
                    </div>
                  </div>

                  <p className="mt-2 inline-flex items-center gap-1 text-[0.72rem] font-semibold uppercase tracking-wide text-[#5d748d]">
                    Includes
                  </p>

                  <div className="mt-2 max-h-[156px] space-y-1 overflow-y-auto pr-1 custom-scroll">
                    {(category.amenities?.length ? category.amenities : ["Standard seating", "Comfortable travel"]).map((amenity) => (
                      <div key={amenity} className="flex items-start gap-2 text-[0.84rem] leading-snug text-[#4a627c]">
                        <Check size={13} className="mt-[3px] shrink-0 text-[#22c55e]" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelect(category.targetCategoryId)}
                    disabled={category.availableSeats === 0}
                    className="mt-2.5 w-full rounded-xl bg-[var(--booking-primary)] py-1.5 text-[0.84rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Select this class
                  </button>
                </div>
              ) : null} */}
            </div>
          );
        })}
      </div>

      {/* Mobile details fallback since hover is not available */}
      {detailCategory ? (
        <div className="max-w-[320px] rounded-2xl border border-[#c8d5e3] bg-white p-3.5 md:hidden">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[0.98rem] font-semibold uppercase text-[#071c3d]">{detailCategory.categoryName}</p>
            <div className="text-right">
              <p className="text-[1.65rem] font-semibold leading-none text-[#071c3d]">₹ {detailCategory.fare}</p>
              <p className="text-xs text-[#6b8299]">/ pax</p>
            </div>
          </div>

          <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#5d748d]">
            <Info size={13} /> Includes
          </p>

          <div className="mt-2.5 space-y-1.5">
            {(detailCategory.amenities?.length ? detailCategory.amenities : ["Standard seating", "Comfortable travel"]).map((amenity) => (
              <div key={amenity} className="flex items-start gap-2 text-sm leading-snug text-[#4a627c]">
                <Check size={15} className="mt-[3px] shrink-0 text-[#22c55e]" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleSelect(detailCategory.targetCategoryId)}
            disabled={detailCategory.availableSeats === 0}
            className="mt-3 w-full rounded-xl bg-[var(--booking-primary)] py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Select this class
          </button>
        </div>
      ) : null}
      <AnimatePresence>
        {hoveredCategory && anchorEl && (
          <SeatTooltip
            anchorEl={anchorEl}
            category={hoveredCategory}
            onSelect={handleSelect}
            hoverTimeout={hoverTimeout}
            onClose={() => {
              setAnchorEl(null);
              setHoveredCategory(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SeatClassSection;
