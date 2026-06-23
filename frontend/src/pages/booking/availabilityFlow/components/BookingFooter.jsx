import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectSelectedSlotId,
  selectSelectedCategoryId,
  selectStep,
  selectTermsAccepted,
  selectIsRoundTrip,
  selectReturnSlotId,
  selectReturnCategoryId,
  selectBookingLoading,
  selectIsPrimaryGuestComplete,
  selectPricing,
  selectGuestDetails,
  selectSeatPassengerFlowEnabled,
  selectConfirmHoldExpiresAt,
  selectTripValidation,
} from "../../../../features/booking/availabilitySession/availabilitySelectors";

import {
  startConfirmHoldTimer,
  setGuestValidationVisible,
  setStep,
} from "../../../../features/booking/availabilitySession/availabilitySessionSlice";
import {
  createBooking,
  createSeatHold,
  createRoundTripBooking,
} from "../../../../features/booking/availabilitySession/availabilityThunks";

const FULL_STEP_ORDER = ["route", "date", "trip", "passengers", "seats", "confirm"];
const BASIC_STEP_ORDER = ["route", "date", "trip", "confirm"];
const showError = (message) => {
  if (!message) return;

  if (window.showToast) {
    window.showToast("danger", message, "top-right");
    return;
  }

  window.alert(message);
};

const BookingFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentStep = useSelector(selectStep);
  const selectedSlotId = useSelector(selectSelectedSlotId);
  const selectedCategoryId = useSelector(selectSelectedCategoryId);
  const termsAccepted = useSelector(selectTermsAccepted);
  const isRoundTrip = useSelector(selectIsRoundTrip);
  const returnSlotId = useSelector(selectReturnSlotId);
  const returnCategoryId = useSelector(selectReturnCategoryId);
  const bookingLoading = useSelector(selectBookingLoading);
  const pricing = useSelector(selectPricing);
  const isPrimaryGuestComplete = useSelector(selectIsPrimaryGuestComplete);
  const guestDetails = useSelector(selectGuestDetails);
  const isSeatPassengerFlowEnabled = useSelector(selectSeatPassengerFlowEnabled);
  const tripValidation = useSelector(selectTripValidation);
  const confirmHoldExpiresAt = useSelector(selectConfirmHoldExpiresAt);
  const [nowMs, setNowMs] = useState(Date.now());

  const stepOrder = isSeatPassengerFlowEnabled ? FULL_STEP_ORDER : BASIC_STEP_ORDER;

  const hasPrimaryName = (guestDetails?.[0]?.name || "").trim().length > 0;

  const currentIndex = stepOrder.indexOf(currentStep);

  const isRouteStep = currentStep === "route";
  const isConfirmStep = currentStep === "confirm";

  const canGoBack = currentIndex > 0;
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
    if (!isConfirmStep || !confirmHoldExpiresAt) return undefined;

    const intervalId = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isConfirmStep, confirmHoldExpiresAt]);

  const canGoNext =
    currentStep === "date"
      ? isRoundTrip
        ? !!selectedSlotId && !!returnSlotId
        : !!selectedSlotId
      : currentStep === "trip"
        ? isRoundTrip
          ? !!selectedCategoryId && !!returnCategoryId && tripValidation.isValid
          : !!selectedCategoryId && tripValidation.isValid
        : currentStep === "passengers"
          ? hasPrimaryName
          : currentStep === "seats"
            ? true
            : currentStep === "confirm"
              ? true
              : true;

  const handleBack = () => {
    // 🟢 If on Route → go to calendar page
    if (isRouteStep) {
      navigate("/booking/add");
      return;
    }

    if (!canGoBack) return;

    dispatch(setStep(stepOrder[currentIndex - 1]));
  };

  const handleNext = async () => {
    if (isConfirmStep) {
      if (bookingLoading) return; // prevent double-click

      if (confirmHoldExpiresAt && confirmHoldRemainingMs <= 0) {
        showError("Seat hold timer expired. Please review your seats again.");
        return;
      }

      if (!isPrimaryGuestComplete) {
        dispatch(setGuestValidationVisible(true));
        showError("Please complete Primary Guest details before booking.");
        return;
      }

      if (!termsAccepted) {
        showError("Please accept Terms & Conditions before booking.");
        return;
      }

      const action = isRoundTrip
        ? await dispatch(createRoundTripBooking())
        : await dispatch(createBooking());

      if (action.meta.requestStatus === "rejected") {
        const errorMessage =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Booking failed";
        showError(errorMessage);
      } else if (action.payload?.partialSuccess) {
        const partialMessage =
          typeof action.payload.returnError === "string"
            ? action.payload.returnError
            : action.payload.returnError?.message || "Return booking failed. Departure was confirmed.";
        showError(partialMessage);
      }
      return;
    }

    const nextStep = stepOrder[currentIndex + 1];
    if (nextStep === "confirm") {
      if (currentStep === "seats") {
        const departureHoldAction = await dispatch(createSeatHold({ leg: "departure" }));
        if (departureHoldAction.meta.requestStatus === "rejected") {
          const holdError =
            typeof departureHoldAction.payload === "string"
              ? departureHoldAction.payload
              : departureHoldAction.payload?.message || "Failed to hold departure seats";
          showError(holdError);
          return;
        }

        if (isRoundTrip && returnSlotId) {
          const returnHoldAction = await dispatch(createSeatHold({ leg: "return" }));
          if (returnHoldAction.meta.requestStatus === "rejected") {
            const holdError =
              typeof returnHoldAction.payload === "string"
                ? returnHoldAction.payload
                : returnHoldAction.payload?.message || "Failed to hold return seats";
            showError(holdError);
            return;
          }
        }
      }

      dispatch(startConfirmHoldTimer(5 * 60 * 1000));
    }
    dispatch(setStep(nextStep));
  };
  const getBackLabel = () => {
    if (isRouteStep) return "Calendar";
    return "← Back";
  };

  const getNextLabel = () => {
    if (isConfirmStep) {
      if (bookingLoading) return "Booking...";
      if (confirmHoldExpiresAt && confirmHoldRemainingMs <= 0) return "Session Expired";
      if (!isPrimaryGuestComplete) return "Complete Primary Guest Info";
      if (!termsAccepted) return "Accept Terms & Continue";
      const total = Number(pricing?.total || 0).toLocaleString("en-IN");
      return `Confirm & Book • ₹ ${total}`;
    }
    return "Next →";
  };

  return (
    <div className="border-t border-[var(--booking-border-strong)] bg-white/95 px-3 py-3 shadow-[0_-8px_24px_rgba(15,45,58,0.04)] sm:px-4 sm:py-4 lg:px-6">
      {currentStep === "trip" && !tripValidation.isValid ? (
        <div className="mb-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          {tripValidation.warnings[0] || "Please fix trip details to continue."}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition sm:px-6 ${isRouteStep || canGoBack
            ? "border-[var(--booking-border-strong)] text-[var(--booking-primary)] hover:bg-[var(--booking-surface-muted)]"
            : "opacity-40 cursor-not-allowed"
            }`}
        >
          {getBackLabel()}
        </button>


        <button
          disabled={bookingLoading || (!isConfirmStep && !canGoNext)}
          onClick={handleNext}
          className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition sm:px-6 ${(isConfirmStep ? !bookingLoading : canGoNext && !bookingLoading)
            ? "bg-[var(--booking-primary)] text-white shadow-sm hover:opacity-90"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {getNextLabel()}
        </button>
      </div>
    </div>
  );
};

export default BookingFooter;
