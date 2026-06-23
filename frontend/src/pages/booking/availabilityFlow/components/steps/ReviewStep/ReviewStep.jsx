import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import JourneyCard from "./components/JourneyCard";
import InvoiceSection from "./components/InvoiceSection";
import KeyInformationSection from "./components/KeyInformationSection";
import TravellerSection from "./components/TravellerSection";
import TermsAgreement from "./components/TermsAgreement";
import BookingSuccess from "./components/BookingSuccess";
import BookingTicketCard from "./components/BookingTicketCard";
import {
  resetBookingFlowState,
} from "../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import {
  selectBookingSuccess,
  selectBookingSummary,
  selectConfirmHoldExpiresAt,
  selectIsRoundTrip,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";


const ReviewStep = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const summary = useSelector(selectBookingSummary);
  const bookingSuccess = useSelector(selectBookingSuccess);
  const isRoundTrip = useSelector(selectIsRoundTrip);
  const confirmHoldExpiresAt = useSelector(selectConfirmHoldExpiresAt);
  const [nowMs, setNowMs] = useState(Date.now());

  const confirmHoldRemainingMs = useMemo(() => {
    if (!confirmHoldExpiresAt) return 0;
    return Math.max(0, confirmHoldExpiresAt - nowMs);
  }, [confirmHoldExpiresAt, nowMs]);

  const confirmHoldText = useMemo(() => {
    if (!confirmHoldExpiresAt) return null;
    const totalSeconds = Math.ceil(confirmHoldRemainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [confirmHoldExpiresAt, confirmHoldRemainingMs]);

  useEffect(() => {
    if (!confirmHoldExpiresAt) return undefined;

    const intervalId = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [confirmHoldExpiresAt]);

  const handleBackToHome = () => {
    dispatch(resetBookingFlowState());
    navigate("/");
  };

  if (bookingSuccess) {
    return (
      <div className="space-y-6 w-[80vw] max-w-[1250px] mx-auto">
        <BookingSuccess />

        {/* Departure ticket */}
        <BookingTicketCard summary={summary} label="Departure" />

        {/* Return ticket (round trip only) */}
        {isRoundTrip && (
          <BookingTicketCard
            summary={{
              ...summary,
              ferryName: summary.returnFerryName ?? summary.ferryName,
              journey: summary.returnJourney,
            }}
            label="Return"
          />
        )}

        <div className="flex justify-center gap-4 pt-6">
          <button className="rounded-xl border border-[#a6b7c8] px-6 py-3 text-[1rem] text-[#071c3d] hover:bg-[#f8fafc]">
            Download E-Ticket
          </button>
          <button
            onClick={handleBackToHome}
            className="rounded-xl bg-[#0f2d3a] px-6 py-3 text-[1rem] text-white hover:opacity-95"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* {confirmHoldText ? (
        <div className={`rounded-2xl border px-4 py-3 sm:px-5 ${confirmHoldRemainingMs > 0 ? "border-[#b7d4e4] bg-[#f4faff]" : "border-[#fecaca] bg-[#fff5f5]"}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#56708d]">Seat Hold Timer</p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <p className={`text-xl font-semibold tracking-tight ${confirmHoldRemainingMs > 0 ? "text-[#0f2d3a]" : "text-red-700"}`}>
              {confirmHoldText}
            </p>
            <p className={`text-xs sm:text-sm ${confirmHoldRemainingMs > 0 ? "text-[#56708d]" : "text-red-600"}`}>
              {confirmHoldRemainingMs > 0 ? "Seats are temporarily reserved. Complete booking before timer ends." : "Seat hold expired. Please go back and recheck seat availability."}
            </p>
          </div>
        </div>
      ) : null} */}

      <h2 className="text-xl font-semibold tracking-tight text-[#071c3d] sm:text-2xl">Review & Confirm</h2>

      {/* Journey cards — side-by-side for round trip */}
      {isRoundTrip ? (
        <motion.div className="grid gap-4 xl:grid-cols-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <JourneyCard summary={summary} label="DEPARTURE" />
          <JourneyCard
            summary={{
              ...summary,
              ferryName: summary.returnFerryName ?? summary.ferryName,
              journey: summary.returnJourney,
              date: summary.returnDate,
            }}
            label="RETURN"
          />
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          <JourneyCard summary={summary} />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
        <InvoiceSection summary={summary} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }}>
        <TravellerSection />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.26 }}>
        <KeyInformationSection />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
        <TermsAgreement />
      </motion.div>
    </div>
  );
};
export default ReviewStep;
