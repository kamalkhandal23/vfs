import { useDispatch, useSelector } from "react-redux";
import { UserRound } from "lucide-react";
import {
  selectGuestDetails,
  selectTravellers,
} from "../../../../../features/booking/availabilitySession/availabilitySelectors";
import { updateGuest } from "../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import { getInitials } from "../../../../../utils/string";

const PassengersStep = () => {
  const dispatch = useDispatch();
  const travellers = useSelector(selectTravellers);
  const guestDetails = useSelector(selectGuestDetails);
  const totalTravellers =
    travellers.passengers + (travellers.infants || 0);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-[var(--booking-primary)] sm:text-2xl">
          Passenger Details
        </h2>
        <p className="mt-1 text-sm text-[#64748b]">
          Enter passenger names. You can assign seats in the next step.
        </p>
      </div>

      {/* 🔥 Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: totalTravellers }).map((_, index) => {
          const passenger = guestDetails?.[index] || {};
          const value = passenger.name || "";
          const isInfant = index >= travellers.passengers;

          return (
            <div
              key={index}
              className={`group rounded-2xl border p-4 transition hover:shadow-md
                ${isInfant ? "bg-blue-50 border-blue-200" : "bg-white border-[#e2e8f0]"}`}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-semibold
                      ${isInfant ? "bg-blue-500" : "bg-[var(--booking-primary)]"}`}
                  >
                    {getInitials(value) || index + 1}
                  </div>

                  <p className="text-sm font-semibold text-[var(--booking-primary)]">

                    {isInfant
                      ? `Infant ${index - travellers.passengers + 1}`
                      : `Passenger ${index + 1}`}
                  </p>
                </div>

                {index === 0 && (
                  <span className="text-[10px] font-medium text-red-500">
                    Required
                  </span>
                )}
              </div>

              {/* Input */}
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wide text-[#64748b] flex items-center gap-1 mb-1">
                  <UserRound size={12} />
                  Full Name
                </label>

                <input
                  value={value}
                  onChange={(e) =>
                    dispatch(
                      updateGuest({
                        index,
                        field: "name",
                        value: e.target.value,
                      })
                    )
                  }
                  placeholder={isInfant ? `Infant ${index - travellers.passengers + 1} name` : `Passenger ${index + 1} name`}
                  className="w-full rounded-lg border border-[#dbe3ed] px-3 py-2 text-sm text-[#071c3d] outline-none transition focus:border-[var(--booking-primary)] focus:ring-1 focus:ring-[var(--booking-primary)]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PassengersStep;
