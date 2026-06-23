import { useSelector } from "react-redux";
import { AlertCircle, Check } from "lucide-react";
import {
  selectDepartureResult,
  selectReturnResult,
  selectBookingPartialSuccess,
  selectIsRoundTrip,
} from "../../../../../../../features/booking/availabilitySession/availabilitySelectors";

const BookingSuccess = () => {
  const departureResult = useSelector(selectDepartureResult);
  const returnResult = useSelector(selectReturnResult);
  const partialSuccess = useSelector(selectBookingPartialSuccess);
  const isRoundTrip = useSelector(selectIsRoundTrip);

  const departureCode = departureResult?.bookingCode || "--";
  const returnCode = returnResult?.bookingCode;

  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#d7f0e6]">
        <Check size={42} className="text-[#16a34a]" />
      </div>

      <h2 className="text-[3rem] font-bold tracking-tight text-[#071c3d]">Booking Confirmed!</h2>
      <p className="text-[1.4rem] text-[#466487]">Your e-ticket has been generated</p>

      <div className="mx-auto inline-flex items-center rounded-full bg-[#edf2f7] px-5 py-2 text-[1.2rem] font-medium text-[#071c3d]">
        Ref:&nbsp;<span className="font-semibold">{departureCode}</span>
      </div>

      {isRoundTrip && returnCode ? (
        <div className="mx-auto inline-flex items-center rounded-full bg-[#edf2f7] px-5 py-2 text-[1.2rem] font-medium text-[#071c3d]">
          Return Ref:&nbsp;<span className="font-semibold">{returnCode}</span>
        </div>
      ) : null}

      {partialSuccess ? (
        <div className="mx-auto mt-3 flex max-w-3xl items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-left text-amber-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span className="text-sm">
            Departure booking confirmed ({departureCode}), but return booking failed. Please contact support.
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default BookingSuccess;
