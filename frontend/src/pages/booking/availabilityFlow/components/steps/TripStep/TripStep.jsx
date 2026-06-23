import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftRight,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
} from "lucide-react";
import DepartureSection from "./DepartureSection";
import SeatClassSection from "./SeatClassSection";
import DateSummaryCard from "./DateSummaryCard";
import TravellersSection from "./TravellersSection";
import VehiclesSection from "./VehiclesSection";
import CalendarCore from "../../../../../../features/booking/calendar/CalendarCore";
import useReturnCalendar from "../../../../../../features/booking/calendar/hooks/useReturnCalendar";
import EmptyState from "../../../../../../components/ui/empty/EmptyState";
import {
  selectBookingSummary,
  selectIsRoundTrip,
  selectRoundTripFlowSource,
  selectReturnJourney,
  selectReturnRoute,
  selectReturnSelectedDate,
  selectReturnSlotId,
  selectSelectedDate,
  selectSelectedRouteIsLongHaul,
  selectSelectedSlot,
  selectTravellers,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";
import {
  setJourneyMode,
} from "../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import { formatTime, parseTimeToMinutes } from "../../../../../../utils/DateUtils";
import { smartFormat } from "../../../../../../utils/string";

const TripJourneyPanel = ({
  dateLabel,
  day,
  month,
  title,
  subtitle,
  fare,
  isOpen,
  onToggle,
  children,
  isReturnActive = false
}) => {
  return (
    <div className="booking-card overflow-hidden rounded-[26px] bg-white shadow-[0_4px_18px_rgba(15,45,58,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className={`w-12 shrink-0 rounded-xl px-3 py-3 text-center  ${isReturnActive ? "bg-[#eef3f9] text-[var(--booking-primary)] border-1 " : "bg-[#0f2d3a] text-white"}`}>
            <div className="text-[13px] font-bold leading-none">{day}</div>
            <div className="mt-1 text-[10px] font-semibold tracking-wide opacity-85">{month}</div>
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-semibold tracking-tight text-[#071c3d] sm:text-lg">{title}</p>
            <p className="truncate text-xs text-[#64748b] sm:text-sm">{dateLabel} • {subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pl-4">
          <span className="text-base font-semibold text-[#071c3d] sm:text-lg">₹{fare || 0}</span>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen ? <div className="border-t border-[var(--booking-border)] px-5 py-6 sm:px-6">{children}</div> : null}
    </div>
  );
};

TripJourneyPanel.propTypes = {
  dateLabel: PropTypes.string,
  day: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  month: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  fare: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.node,
};

const SummaryInfoCard = ({ title, value, helper }) => (
  <div className="rounded-[20px] border border-[var(--booking-border)] bg-[var(--booking-surface-muted)] px-4 py-3.5">
    <p className="text-xs font-semibold text-[#071c3d] sm:text-sm">{title}</p>
    <p className="mt-1.5 text-sm text-[#475569] sm:text-base">{value}</p>
    {helper ? <p className="mt-1 text-xs text-[#94a3b8]">{helper}</p> : null}
  </div>
);

SummaryInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  helper: PropTypes.string,
};

const ReturnTripCTA = ({ onAdd }) => (
  <div className="rounded-[20px] border border-dashed border-[#a8b8ca] bg-[#f8fbff] px-4 py-4 text-center sm:px-5 sm:py-5">
    <p className="text-[0.98rem] font-semibold leading-tight text-[#071c3d] sm:text-[1.06rem]">
      Looking for a return trip?
    </p>
    <p className="mx-auto mt-1.5 max-w-[32rem] text-[0.82rem] leading-relaxed text-[#587392] sm:text-[0.9rem]">
      Add a return journey - same passengers & vehicle details will be auto-applied.
    </p>
    <button
      type="button"
      onClick={onAdd}
      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#0f2d3a] px-4 py-2 text-[0.82rem] font-semibold text-white transition hover:bg-[#12394a]"
    >
      <ArrowRight size={14} />
      Add Return Trip
    </button>
  </div>
);

ReturnTripCTA.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

const ReturnTripConfigPanel = ({ routeName, onRemove, children }) => (
  <div className="booking-card overflow-hidden rounded-[26px] bg-white shadow-[0_4px_18px_rgba(15,45,58,0.04)]">
    <div className="flex items-center justify-between border-b border-[var(--booking-border)] bg-[var(--booking-surface-muted)] px-5 py-4 sm:px-6">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[#071c3d]">
          <ArrowLeftRight size={18} />
          <p className="text-[1.05rem] font-semibold sm:text-[1.15rem]">Return Trip</p>
          {routeName ? (
            <span className="truncate text-xs font-medium uppercase tracking-[0.12em] text-[#587392] sm:text-sm sm:normal-case sm:tracking-normal">
              {routeName}
            </span>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="text-sm font-medium text-red-500 hover:opacity-80"
      >
        Remove
      </button>
    </div>

    <div className="space-y-6 px-5 py-5 sm:px-6">{children}</div>
  </div>
);

ReturnTripConfigPanel.propTypes = {
  routeName: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const TripStep = () => {
  const dispatch = useDispatch();
  const isRoundTrip = useSelector(selectIsRoundTrip);
  const roundTripFlowSource = useSelector(selectRoundTripFlowSource);
  const summary = useSelector(selectBookingSummary);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedSlot = useSelector(selectSelectedSlot);
  const isLongHaul = useSelector(selectSelectedRouteIsLongHaul);
  const returnRoute = useSelector(selectReturnRoute);
  const returnJourney = useSelector(selectReturnJourney);
  const returnSelectedDate = useSelector(selectReturnSelectedDate);
  const returnSlotId = useSelector(selectReturnSlotId);
  const travellers = useSelector(selectTravellers);
  const authUser = useSelector((state) => state.auth?.user);

  const [openPanel, setOpenPanel] = useState("departure");
  const [shouldScrollToReturn, setShouldScrollToReturn] = useState(false);
  const returnPanelRef = useRef(null);
  const showTripStepReturnConfigurator = isRoundTrip && roundTripFlowSource === "TRIP_STEP";

  const {
    monthLabel: returnMonthLabel,
    matrix: returnMatrix,
    monthStatusMap: returnMonthStatusMap,
    loadingMonth: loadingReturnMonth,
    selectedDate: selectedReturnDateFromCalendar,
    handleSelectDate: handleSelectReturnDate,
    handlePrev: handleReturnPrev,
    handleNext: handleReturnNext,
    showPrev: showReturnPrev,
  } = useReturnCalendar(showTripStepReturnConfigurator, "TRIP_STEP");

  useEffect(() => {
    if (!isRoundTrip && openPanel !== "departure") {
      setOpenPanel("departure");
    }
  }, [isRoundTrip, openPanel]);

  useEffect(() => {
    if (showTripStepReturnConfigurator && !returnSelectedDate) {
      setOpenPanel("return");
    }
  }, [showTripStepReturnConfigurator, returnSelectedDate]);

  useEffect(() => {
    if (!showTripStepReturnConfigurator || !shouldScrollToReturn) return;

    requestAnimationFrame(() => {
      const panel = returnPanelRef.current;
      const scrollContainer = panel?.closest(".custom-scroll");

      if (!panel || !scrollContainer) return;

      const panelTop = panel.offsetTop - scrollContainer.offsetTop - 8;
      scrollContainer.scrollTo({
        top: Math.max(0, panelTop),
        behavior: "smooth",
      });
    });

    setShouldScrollToReturn(false);
  }, [showTripStepReturnConfigurator, shouldScrollToReturn]);

  const departureDate = summary?.date || "--";
  const returnDate = summary?.returnDate || "--";

  const depDateObj = departureDate && departureDate !== "--" ? new Date(departureDate) : null;
  const retDateObj = returnDate && returnDate !== "--" ? new Date(returnDate) : null;

  const depDay = depDateObj ? depDateObj.getDate() : "--";
  const depMonth = depDateObj
    ? depDateObj.toLocaleString("en-US", { month: "short" }).toUpperCase()
    : "--";
  const retDay = retDateObj ? retDateObj.getDate() : "--";
  const retMonth = retDateObj
    ? retDateObj.toLocaleString("en-US", { month: "short" }).toUpperCase()
    : "--";

  const departureSubtitle = `${formatTime(summary?.journey?.departureTime || "--")} → ${formatTime(summary?.journey?.arrivalTime || "--")} • ${travellers?.passengers || 0} Pax • ${summary?.categoryName || "-"}`;
  const returnSubtitle = `${formatTime(summary?.returnJourney?.departureTime || "--")} → ${formatTime(summary?.returnJourney?.arrivalTime || "--")} • ${travellers?.passengers || 0} Pax • ${summary?.returnCategoryName || "-"}`;

  const departureMinutes = useMemo(
    () => parseTimeToMinutes(selectedSlot?.departureTime),
    [selectedSlot?.departureTime]
  );

  const disableBeforeMinutes = useMemo(() => {
    if (!isRoundTrip) return undefined;
    if (isLongHaul) return undefined;
    if (!departureMinutes) return undefined;
    if (!selectedDate || !returnSelectedDate) return undefined;
    if (selectedDate !== returnSelectedDate) return undefined;
    return departureMinutes + 60;
  }, [isRoundTrip, isLongHaul, departureMinutes, selectedDate, returnSelectedDate]);

  const returnRouteLabel = returnRoute?.routeName
    || (summary?.returnJourney?.from && summary?.returnJourney?.to
      ? `${summary.returnJourney.from} → ${summary.returnJourney.to}`
      : null);

  const showSeatDetailsForAgent = useMemo(() => {
    const roleText = [
      authUser?.role,
      authUser?.roleName,
      authUser?.designation,
      authUser?.userType,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return roleText.includes("agent");
  }, [authUser]);

  const handleAddReturnTrip = () => {
    dispatch(setJourneyMode({ mode: "ROUND_TRIP", source: "TRIP_STEP" }));
    setOpenPanel("return");
    setShouldScrollToReturn(true);
  };

  const handleRemoveReturnTrip = () => {
    dispatch(setJourneyMode("ONE_WAY"));
    setOpenPanel("departure");
  };

  if (!isRoundTrip) {
    return (
      <div className="space-y-6 pb-4 sm:space-y-7">
        <DateSummaryCard />
        <DepartureSection showSeatDetailsForAgent={showSeatDetailsForAgent} />
        <SeatClassSection />
        <TravellersSection />
        <VehiclesSection />
        <ReturnTripCTA onAdd={handleAddReturnTrip} />
      </div>
    );
  }

  if (!showTripStepReturnConfigurator) {
    return (
      <div className="space-y-5 pb-4 sm:space-y-6">
        <DateSummaryCard />

        <TripJourneyPanel
          dateLabel={departureDate}
          day={depDay}
          month={depMonth}
          title={`Departure: ${smartFormat(summary?.journey?.from, "upper") || "-"} → ${smartFormat(summary?.journey?.to, "upper") || "-"}`}
          subtitle={departureSubtitle}
          fare={summary?.baseFare}
          isOpen={openPanel === "departure"}
          onToggle={() => setOpenPanel((panel) => (panel === "departure" ? "none" : "departure"))}
        >
          <div className="space-y-6 sm:space-y-7">
            <DepartureSection showSeatDetailsForAgent={showSeatDetailsForAgent} />
            <SeatClassSection />
            <TravellersSection />
            <VehiclesSection />
          </div>
        </TripJourneyPanel>

        <TripJourneyPanel
          dateLabel={returnDate}
          day={retDay}
          month={retMonth}
          isReturnActive
          title={`Return: ${smartFormat(summary?.returnJourney?.from, "upper") || "-"} → ${smartFormat(summary?.returnJourney?.to, "upper") || "-"}`}
          subtitle={returnSubtitle}
          fare={summary?.returnBaseFare}
          isOpen={openPanel === "return"}
          onToggle={() => setOpenPanel((panel) => (panel === "return" ? "none" : "return"))}
        >
          {returnSelectedDate ? (
            returnJourney?.snapshot?.routes?.length === 0 ? (
              <EmptyState
                icon={Clock3}
                title="No return sailings available for this date"
                description="Please choose a different return date"
              />
            ) : !returnRoute ? (
              <EmptyState
                icon={Clock3}
                title="No matching return route available"
                description="Only reverse-route sailings can be booked for the return trip"
              />
            ) : (
              <div className="space-y-6 sm:space-y-7">
                <DepartureSection
                  isReturn
                  disableBeforeMinutes={disableBeforeMinutes}
                  showSeatDetailsForAgent={showSeatDetailsForAgent}
                />
                {returnSlotId ? <SeatClassSection isReturn /> : null}
              </div>
            )
          ) : (
            <EmptyState
              icon={Clock3}
              title="Return date not selected"
              description="Choose a return date in DateStep to configure return trip"
            />
          )}
        </TripJourneyPanel>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-4 sm:space-y-6">
      <DateSummaryCard />

      <TripJourneyPanel
        dateLabel={departureDate}
        day={depDay}
        month={depMonth}
        title={`Departure: ${summary?.journey?.from || "-"} → ${summary?.journey?.to || "-"}`}
        subtitle={departureSubtitle}
        fare={summary?.baseFare}
        isOpen={openPanel === "departure"}
        isReturnActive
        onToggle={() => setOpenPanel((panel) => (panel === "departure" ? "none" : "departure"))}
      >
        <div className="space-y-6 sm:space-y-7">
          <DepartureSection showSeatDetailsForAgent={showSeatDetailsForAgent} />
          <SeatClassSection />
          <TravellersSection />
          <VehiclesSection />
        </div>
      </TripJourneyPanel>


      <div className="rounded-2xl border border-[#9ad9b4] bg-[#edfdf3] px-4 py-3 text-sm font-medium text-[#0f8a46]">
        <span className="inline-flex items-center gap-2">
          <Check size={15} />
          Return trip added — configure below
        </span>
      </div>

      <div ref={returnPanelRef}>
        <ReturnTripConfigPanel routeName={returnRouteLabel} onRemove={handleRemoveReturnTrip}>
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#071c3d]">
              <CalendarDays size={18} />
              <h3 className="text-[1.1rem] font-semibold tracking-tight sm:text-[1.25rem]">Select Return Date</h3>
            </div>

            <CalendarCore
              monthLabel={returnMonthLabel}
              matrix={returnMatrix}
              statusMap={returnMonthStatusMap}
              selectedDate={selectedReturnDateFromCalendar}
              onSelectDate={handleSelectReturnDate}
              onPrev={handleReturnPrev}
              onNext={handleReturnNext}
              showPrev={showReturnPrev}
              loading={loadingReturnMonth}
              showLegends={false}
            />
          </section>

          {returnSelectedDate ? (
            returnJourney?.snapshot?.routes?.length === 0 ? (
              <EmptyState
                icon={Clock3}
                title="No return sailings available for this date"
                description="Please choose a different return date"
              />
            ) : !returnRoute ? (
              <EmptyState
                icon={Clock3}
                title="No matching return route available"
                description="Only reverse-route sailings can be booked for the return trip"
              />
            ) : (
              <div className="space-y-5">
                <DepartureSection
                  isReturn
                  disableBeforeMinutes={disableBeforeMinutes}
                  showSeatDetailsForAgent={showSeatDetailsForAgent}
                />

                {returnSlotId ? (
                  <div className="rounded-2xl border border-[#9ad9b4] bg-[#edfdf3] px-4 py-3 text-sm font-medium text-[#0f8a46]">
                    <span className="inline-flex items-center gap-2">
                      <Check size={15} />
                      Return: {summary?.returnDate || "--"} · {formatTime(summary?.returnJourney?.departureTime) || "--"} → {formatTime(summary?.returnJourney?.arrivalTime) || "--"}
                    </span>
                  </div>
                ) : null}

                {returnSlotId ? (
                  <>
                    <SeatClassSection isReturn />

                    <div className="grid gap-4 md:grid-cols-2">
                      <SummaryInfoCard
                        title="Travellers"
                        value={`${travellers?.passengers || 0} Passenger${(travellers?.passengers || 0) > 1 ? "s" : ""}${travellers?.infants ? `, ${travellers.infants} Infant${travellers.infants > 1 ? "s" : ""}` : ""}${travellers?.pets ? `, ${travellers.pets} Pet${travellers.pets > 1 ? "s" : ""}` : ""}`}
                        helper="Same as departure"
                      />
                      <SummaryInfoCard
                        title="Vehicles & Add-ons"
                        value={summary?.vehicleQty > 0 || summary?.addonQty > 0
                          ? `${summary?.vehicleQty || 0} vehicle(s), ${summary?.addonQty || 0} addon(s)`
                          : "No vehicles or add-ons"}
                        helper="Same as departure"
                      />
                    </div>
                  </>
                ) : null}
              </div>
            )
          ) : null}
        </ReturnTripConfigPanel>
      </div>


    </div>
  );
};

export default TripStep;
