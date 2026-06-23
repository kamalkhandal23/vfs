/* eslint-disable react/prop-types */
import { Car, Clock3, QrCode, Ship, UserRound } from "lucide-react";
import { useSelector } from "react-redux";
import { getDuration } from "../../../../../../../utils/DateUtils";

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const BookingTicketCard = ({ summary, label }) => {
  const journey = summary?.journey || {};
  const coupon = useSelector((state) => state.booking.availabilitySession.coupon);

  const seatLabel = summary?.categoryName || "Seat";
  const vehicleQty = Number(summary?.vehicleQty || 0);
  const baseFare = Number(summary?.baseFare || 0);
  const vehicleFare = Number(summary?.vehicleFare || 0);
  const discount = Number(coupon?.discount || 0);
  const total = Number(summary?.total || 0);
  

  return (
    <div className="overflow-hidden rounded-[22px] border bg-white shadow-[0_4px_16px_rgba(15,45,58,0.05)]">
      <div className="flex items-center justify-between bg-[#061b44] px-4 py-2.5 text-white sm:px-6 sm:py-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]">
          <Ship size={14} />
          {label ? `${label} Journey` : "Your Journey"}
        </span>
        <span className="text-sm font-medium">{summary?.ferryName || "M2M-2"}</span>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          <div className="min-w-0">
            <p className="whitespace-nowrap text-[1.9rem] font-bold leading-none tracking-tight text-[#071c3d] sm:text-[2.6rem] lg:text-[3.1rem]">{journey.departureTime || "--"}</p>
            <p className="mt-1 truncate text-[1.1rem] font-semibold text-[#071c3d] sm:text-[1.35rem] lg:text-[1.55rem]">{journey.from || "--"}</p>
          </div>

          <div className="min-w-[120px] text-center text-[#8aa0b7] sm:min-w-[220px] lg:min-w-[300px]">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#c9d5e3]" />
              <Ship size={14} />
              <div className="h-px flex-1 bg-[#c9d5e3]" />
            </div>
            <p className="mt-1 text-sm">{getDuration(journey.departureTime, journey.arrivalTime)}</p>
            
          </div>

          <div className="min-w-0 text-right">
            <p className="whitespace-nowrap text-[1.9rem] font-bold leading-none tracking-tight text-[#071c3d] sm:text-[2.6rem] lg:text-[3.1rem]">{journey.arrivalTime || "--"}</p>
            <p className="mt-1 truncate text-[1.1rem] font-semibold text-[#071c3d] sm:text-[1.35rem] lg:text-[1.55rem]">{journey.to || "--"}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[#deE7f1] py-3 text-sm text-[#1e3a5f] sm:mt-6 sm:gap-6 sm:py-4 sm:text-[1.05rem]">
          <span className="inline-flex items-center gap-2"><Clock3 size={16} /> {summary?.date || "--"}</span>
          <span className="inline-flex items-center gap-2"><UserRound size={16} /> {summary?.adults || summary?.passengers || 1} Adult</span>
          {(summary?.children || 0) > 0 ? <span>{summary.children} Infant</span> : null}
          <span>{seatLabel}</span>
          {vehicleQty > 0 ? <span className="inline-flex items-center gap-2"><Car size={16} /> {vehicleQty} Car</span> : null}
        </div>

        <div className="mt-2 border-t border-dashed border-[#d1dcea] pt-4">
          <div className="grid grid-cols-[72px_1fr] gap-4 sm:grid-cols-[88px_1fr] sm:gap-6">
            <div className="flex flex-col items-center gap-2 text-xs font-medium text-[#4f6680]">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border-2 border-dashed border-[#d6e1ec] bg-[#f8fbff] sm:h-[72px] sm:w-[72px]">
                <QrCode size={30} className="text-[#99a8b8] sm:h-9 sm:w-9" />
              </div>
              E-TICKET
            </div>

            <div className="space-y-2 text-sm text-[#1f4367] sm:text-[1.02rem]">
              <div className="flex items-center justify-between">
                <span>{seatLabel} × 1</span>
                <span>{formatCurrency(baseFare)}</span>
              </div>

              {vehicleQty > 0 ? (
                <div className="flex items-center justify-between">
                  <span>Vehicle × {vehicleQty}</span>
                  <span>{formatCurrency(vehicleFare)}</span>
                </div>
              ) : null}

              {coupon?.code ? (
                <>
                  <div className="mt-2 flex items-center justify-between text-xs sm:text-sm">
                    <div className="inline-flex items-center gap-2">
                      <span className="rounded-md border border-[#86efac] bg-[#dcfce7] px-2 py-1 font-semibold text-[#16a34a]">
                        {coupon.code}
                      </span>
                      <span className="text-[#466487]">
                        {coupon?.data?.type === "PERCENTAGE"
                          ? `${coupon.data.discountValue}% off applied`
                          : `${formatCurrency(discount)} off applied`}
                      </span>
                    </div>
                    <span className="text-red-500">× Remove</span>
                  </div>

                  <div className="flex items-center justify-between text-[#16a34a]">
                    <span>You save ({coupon?.data?.discountValue || 0}% off)</span>
                    <span>−{formatCurrency(discount)}</span>
                  </div>
                </>
              ) : null}

              <div className="mt-2 flex items-center justify-between border-t pt-3">
                <div>
                  <p className="text-[1.5rem] font-semibold tracking-tight text-[#071c3d] sm:text-[1.75rem]">Total</p>
                  <p className="text-xs text-[#6b7f95] mt-3">All prices incl. taxes</p>
                </div>
                <p className="text-[2rem] font-bold tracking-tight text-[#071c3d] sm:text-[2.4rem]">{formatCurrency(total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingTicketCard;
