/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Clock } from "lucide-react";
import {
  selectSailingsForSelectedRoute,
  selectSelectedSlotId,
  selectReturnSailings,
  selectReturnSlotId,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";
import {
  setSlot,
  setReturnSlot,
} from "../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import SharedSlotsTable from "../../shared/SharedSlotsTable";

const DepartureSection = ({
  isReturn = false,
  disableBeforeMinutes,
  showSeatDetailsForAgent = false,
}) => {
  const dispatch = useDispatch();

  const departureSailings = useSelector(selectSailingsForSelectedRoute);
  const departureSlotId = useSelector(selectSelectedSlotId);
  const returnSailings = useSelector(selectReturnSailings);
  const returnSlotId = useSelector(selectReturnSlotId);

  const sailings = isReturn ? returnSailings : departureSailings;
  const selectedSlotId = isReturn ? returnSlotId : departureSlotId;

  const handleSelect = (slotId) => {
    dispatch(isReturn ? setReturnSlot(slotId) : setSlot(slotId));
  };

  return (
    <section className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-1 text-[var(--booking-primary)]">
        <Clock size={24} />
        <h3 className="text-lg font-bold tracking-tight sm:text-[1.05rem]">
          {isReturn ? "Select Return Time" : "Select Departure Time"}
        </h3>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#c8d5e3] bg-white">
        <SharedSlotsTable
          slots={sailings}
          selectedSlotId={selectedSlotId}
          onSelectSlot={handleSelect}
          variant="trip"
          showSeatDetailsForAgent={showSeatDetailsForAgent}
          disableBeforeMinutes={disableBeforeMinutes}
          showSkeleton={sailings.length === 0}
          reorderSelectedFirst
          showViewMore
          initialVisibleCount={1}
          emptyMessage="No departures available for the selected route."
        />
      </div>
    </section>
  );
};

export default DepartureSection;
