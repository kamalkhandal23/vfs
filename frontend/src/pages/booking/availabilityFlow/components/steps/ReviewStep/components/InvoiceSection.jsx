import React, { useState } from "react";
import PropTypes from "prop-types";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { verifyCouponCode } from "../../../../../../../features/booking/availabilitySession/availabilityThunks";
import {
  recalculatePricing,
  clearCoupon,
} from "../../../../../../../features/booking/availabilitySession/availabilitySessionSlice";

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const InvoiceSection = ({ summary }) => {
  const dispatch = useDispatch();

  const {
    categoryName,
    passengers,
    vehicleQty,
    vehicleRate,
    addonQty,
    addonFare,
    baseFare,
    returnBaseFare = 0,
    returnCategoryName,
    vehicleFare,
    subtotal,
    total,
    journeyMode,
  } = summary;

  const isRoundTrip = journeyMode === "ROUND_TRIP";

  const { loading, discount, error, code, data: couponData } = useSelector(
    (state) => state.booking.availabilitySession.coupon
  );

  const [promo, setPromo] = useState(code || "");
  const [localError, setLocalError] = useState("");

  const applyCoupon = async () => {
    if (!promo.trim()) return;

    try {
      setLocalError("");
      await dispatch(verifyCouponCode(promo.trim().toUpperCase())).unwrap();
      dispatch(recalculatePricing());
      setPromo("");
    } catch (err) {
      setLocalError(err || "Invalid coupon");
    }
  };

  const handleRemove = () => {
    dispatch(clearCoupon());
    dispatch(recalculatePricing());
    setPromo("");
    setLocalError("");
  };

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#c8d5e3] bg-white">
      <div className="border-b border-[#c8d5e3] bg-[#f6f8fb] px-4 py-3.5 text-xl font-semibold tracking-tight text-[#071c3d] sm:px-5 sm:py-4 sm:text-2xl">
        Invoice
      </div>

      <table className="w-full text-sm sm:text-base">
        <thead className="border-b border-[#c8d5e3] text-xs font-semibold uppercase tracking-[0.2em] text-[#264a6d]">
          <tr>
            <th className="px-4 py-3 text-left sm:px-5">Item</th>
            <th className="text-center">Qty</th>
            <th className="text-center">Rate</th>
            <th className="px-4 text-right sm:px-5">Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-[#c8d5e3]">
            <td className="px-4 py-3.5 sm:px-5 sm:py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#264a6d]">Departure</p>
              <p className="mt-1.5 font-semibold text-[#071c3d]">{categoryName} (Departure)</p>
            </td>
            <td className="text-center text-[#324f70]">{passengers}</td>
            <td className="text-center text-[#466487]">
              {formatCurrency(passengers > 0 ? Math.round(baseFare / passengers) : 0)}
            </td>
            <td className="px-4 text-right font-semibold text-[#071c3d] sm:px-5">{formatCurrency(baseFare)}</td>
          </tr>

          {isRoundTrip && returnBaseFare > 0 ? (
            <tr className="border-b border-[#c8d5e3]">
              <td className="px-4 py-3.5 sm:px-5 sm:py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#264a6d]">Return</p>
                <p className="mt-1.5 font-semibold text-[#071c3d]">{returnCategoryName ?? categoryName} (Return)</p>
              </td>
              <td className="text-center text-[#324f70]">{passengers}</td>
              <td className="text-center text-[#466487]">
                {formatCurrency(passengers > 0 ? Math.round(returnBaseFare / passengers) : 0)}
              </td>
              <td className="px-4 text-right font-semibold text-[#071c3d] sm:px-5">{formatCurrency(returnBaseFare)}</td>
            </tr>
          ) : null}

          {vehicleQty > 0 ? (
            <tr className="border-b border-[#c8d5e3]">
              <td className="px-4 py-3.5 text-[#071c3d] sm:px-5 sm:py-4">Vehicle</td>
              <td className="text-center text-[#324f70]">{vehicleQty}</td>
              <td className="text-center text-[#466487]">{formatCurrency(vehicleRate)}</td>
              <td className="px-4 text-right font-semibold text-[#071c3d] sm:px-5">{formatCurrency(vehicleFare)}</td>
            </tr>
          ) : null}

          {addonQty > 0 ? (
            <tr className="border-b border-[#c8d5e3]">
              <td className="px-4 py-3.5 text-[#071c3d] sm:px-5 sm:py-4">Add-ons</td>
              <td className="text-center text-[#324f70]">{addonQty}</td>
              <td className="text-center text-[#466487]">{formatCurrency(addonQty > 0 ? addonFare / addonQty : 0)}</td>
              <td className="px-4 text-right font-semibold text-[#071c3d] sm:px-5">{formatCurrency(addonFare)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-b border-[#c8d5e3] px-4 py-3.5 text-[1.2rem] text-[#2f4e71] sm:px-5 sm:py-4 sm:text-[1.3rem]">
        <span>Subtotal</span>
        <span className="font-semibold text-[#071c3d]">{formatCurrency(subtotal)}</span>
      </div>

      {code ? (
        <div className="border-b border-[#c8d5e3] px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-[#86efac] bg-[#dcfce7] px-2 py-1 text-sm font-semibold text-[#16a34a]">
                {code}
              </span>
              <span className="text-[#466487]">
                {couponData?.type === "PERCENTAGE" ? `${couponData.discountValue}% off applied` : `${formatCurrency(discount)} off applied`}
              </span>
            </div>

            <button onClick={handleRemove} className="text-[#ef4444] hover:underline">
              × Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="border-b border-[#c8d5e3] px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex gap-3">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!loading && promo.trim()) {
                    applyCoupon();
                  }
                }
              }}
              placeholder="Enter promo code"
              className="flex-1 rounded-xl border border-[#cdd9e5] px-3 py-2.5 text-sm text-[#173d63] outline-none focus:border-[#0f2d3a] sm:px-4 sm:text-base"
            />

            <button
              onClick={applyCoupon}
              disabled={loading || !promo.trim()}
              className="rounded-xl border border-[#90a3b8] px-5 py-2.5 text-sm font-medium text-[#071c3d] hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:text-[1rem]"
            >
              {loading ? "Applying..." : "Apply"}
            </button>
          </div>
        </div>
      )}

      {localError || error ? (
        <p className="px-4 py-2 text-sm text-red-500 sm:px-5">{localError || error}</p>
      ) : null}

      {discount > 0 ? (
        <div className="flex items-center justify-between px-4 py-2 text-[0.95rem] text-[#16a34a] sm:px-5 sm:text-[1.05rem]">
          <span className="inline-flex items-center gap-2">
            <Check size={16} />
            {couponData?.type === "PERCENTAGE" ? `Discount (${couponData.discountValue}%)` : "Discount"}
          </span>
          <span>−{formatCurrency(discount)}</span>
        </div>
      ) : null}

      <div className="border-t border-[#c8d5e3] px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight text-[#071c3d] sm:text-xl">Grand Total</p>
            <p className="text-sm text-[#64748b]">Inclusive of all taxes</p>
          </div>
          <p className="text-3xl font-bold tracking-tight text-[#071c3d] sm:text-4xl">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

InvoiceSection.propTypes = {
  summary: PropTypes.shape({
    categoryName: PropTypes.string,
    passengers: PropTypes.number,
    vehicleQty: PropTypes.number,
    vehicleRate: PropTypes.number,
    addonQty: PropTypes.number,
    addonFare: PropTypes.number,
    baseFare: PropTypes.number,
    returnBaseFare: PropTypes.number,
    returnCategoryName: PropTypes.string,
    journeyMode: PropTypes.string,
    vehicleFare: PropTypes.number,
    subtotal: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
};

export default React.memo(InvoiceSection);
