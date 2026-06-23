import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CalendarCore from "../../../../../features/booking/calendar/CalendarCore";
import useAvailabilityCalendar from "../../../../../features/booking/calendar/hooks/useAvailabilityCalendar";
import useReturnCalendar from "../../../../../features/booking/calendar/hooks/useReturnCalendar";

import FilterBar from "../../../bookingCreationCalendarV2/components/FilterBar";
import DateSlotsPanel from "../DateSlotsPanel";

import {
    selectRoutes as selectSnapshotRoutes,
    selectSelectedDate,
    selectSelectedRouteId,
    selectSelectedSlot,
    selectIsRoundTrip,
    selectReturnRoute,
    selectReturnJourney,
    selectReturnSelectedDate,
    selectReturnSlotId,
    selectSelectedRouteIsLongHaul,
} from "../../../../../features/booking/availabilitySession/availabilitySelectors";

import {
    setRoute,
    setJourneyMode,
    setRoundTripFlowSource,
    setReturnSlot,
    setSessionDate,
    setReturnDate,
} from "../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import {
    loadRoutes,
    selectRoutes as selectMasterRoutes,
    selectActiveRoutesForAvailability,
} from "../../../../../features/booking/routes/routesSlice";
import {
    loadFerries,
    selectFerries,
    selectFerriesLoaded,
} from "../../../../../features/booking/ferry/ferrySlice";

import { AlertCircle, ArrowLeftRight, Ship, X } from "lucide-react";
import EmptyState from "../../../../../components/ui/empty/EmptyState";
import { parseTimeToMinutes } from "../../../../../utils/DateUtils";

export default function DateStep() {
    const dispatch = useDispatch();

    const snapshotRoutes = useSelector(selectSnapshotRoutes);
    const { loaded: masterRoutesLoaded } = useSelector(selectMasterRoutes("ACTIVE"));
    const normalizedMasterRoutes = useSelector(selectActiveRoutesForAvailability);
    const ferries = useSelector(selectFerries);
    const ferriesLoaded = useSelector(selectFerriesLoaded);
    const selectedRouteId = useSelector(selectSelectedRouteId);
    const selectedDateInSession = useSelector(selectSelectedDate);
    const selectedSlot = useSelector(selectSelectedSlot);
    const isRoundTrip = useSelector(selectIsRoundTrip);
    const isLongHaul = useSelector(selectSelectedRouteIsLongHaul);
    const returnRoute = useSelector(selectReturnRoute);
    const returnJourney = useSelector(selectReturnJourney);
    const returnSelectedDateFromStore = useSelector(selectReturnSelectedDate);
    const returnSlotId = useSelector(selectReturnSlotId);
    const [selectedFerry, setSelectedFerry] = useState("ALL");

    useEffect(() => {
        if (!masterRoutesLoaded) {
            dispatch(loadRoutes({ status: "ACTIVE" }));
        }
    }, [dispatch, masterRoutesLoaded]);

    useEffect(() => {
        if (!ferriesLoaded) {
            dispatch(loadFerries());
        }
    }, [dispatch, ferriesLoaded]);

    const {
        monthLabel,
        matrix,
        monthStatusMap,
        loadingMonth,
        selectedDate,
        handleSelectDate,
        handlePrev,
        handleNext,
        showPrev,
    } = useAvailabilityCalendar();

    const {
        monthLabel: returnMonthLabel,
        matrix: returnMatrix,
        monthStatusMap: returnMonthStatusMap,
        loadingMonth: loadingReturnMonth,
        selectedDate: returnSelectedDate,
        handleSelectDate: handleSelectReturnDate,
        handlePrev: handleReturnPrev,
        handleNext: handleReturnNext,
        showPrev: showReturnPrev,
    } = useReturnCalendar(isRoundTrip, "DATE_STEP");

    useEffect(() => {
        if (isRoundTrip) {
            dispatch(setRoundTripFlowSource("DATE_STEP"));
        }
    }, [dispatch, isRoundTrip]);

    // Set default route in redux session if none selected
    useEffect(() => {
        if (normalizedMasterRoutes.length && !selectedRouteId) {
            dispatch(setRoute(normalizedMasterRoutes[0].routeId));
            setSelectedFerry("ALL");
        }
    }, [normalizedMasterRoutes, selectedRouteId, dispatch]);

    const activeRoute =
        snapshotRoutes.find((r) => String(r.routeId) === String(selectedRouteId)) || null;

    const parseRouteEndpoints = (routeName) => {
        if (!routeName || typeof routeName !== "string") return [];
        return routeName
            .split(/\s*(?:<->|->|<-|–|—|→|↔|-)\s*/)
            .map((part) => part.trim())
            .filter(Boolean);
    };

    const displayReturnRoute = useMemo(() => {
        if (returnRoute) return returnRoute;
        if (!selectedRouteId || !normalizedMasterRoutes.length) return null;

        const departureRoute = normalizedMasterRoutes.find(
            (route) => String(route.routeId) === String(selectedRouteId)
        );
        const [from, to] = parseRouteEndpoints(departureRoute?.routeName);
        if (!from || !to) return null;

        return (
            normalizedMasterRoutes.find((route) => {
                const parts = parseRouteEndpoints(route.routeName);
                return parts.length === 2 && parts[0] === to && parts[1] === from;
            }) || null
        );
    }, [returnRoute, selectedRouteId, normalizedMasterRoutes]);

    const departureMinutes = useMemo(() => {
        return parseTimeToMinutes(selectedSlot?.departureTime);
    }, [selectedSlot?.departureTime]);

    const returnRoutesForPanel = useMemo(() => {
        const snapshotReturnRoutes = returnJourney?.snapshot?.routes;
        if (Array.isArray(snapshotReturnRoutes) && snapshotReturnRoutes.length > 0) {
            return snapshotReturnRoutes;
        }
        return returnRoute ? [returnRoute] : [];
    }, [returnJourney?.snapshot?.routes, returnRoute]);

    const returnRouteIdForPanel = useMemo(() => {
        if (returnRoute?.routeId != null) return returnRoute.routeId;
        if (returnRoutesForPanel[0]?.routeId != null) return returnRoutesForPanel[0].routeId;
        return null;
    }, [returnRoute?.routeId, returnRoutesForPanel]);

    const disableBeforeMinutes = useMemo(() => {
        if (!isRoundTrip) return undefined;
        if (isLongHaul) return undefined;
        if (!departureMinutes) return undefined;
        if (!selectedDateInSession || !returnSelectedDateFromStore) return undefined;
        if (selectedDateInSession !== returnSelectedDateFromStore) return undefined;
        return departureMinutes + 60;
    }, [
        isRoundTrip,
        isLongHaul,
        departureMinutes,
        selectedDateInSession,
        returnSelectedDateFromStore,
    ]);

    const handleSwitchToOneWay = () => {
        dispatch(setJourneyMode("ONE_WAY"));
    };

    return (
        <div className="flex flex-col gap-6">
            {/* ===== DEPARTURE DATE SECTION ===== */}
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">
                Select {isRoundTrip ? "Departure" : ""} Date
            </h2>

            {/* FILTER BAR */}
            {normalizedMasterRoutes.length > 0 && (
                <FilterBar
                    routes={normalizedMasterRoutes}
                    ferries={ferries}
                    sailings={activeRoute?.sailings || []}
                    selectedRoute={selectedRouteId}
                    setSelectedRoute={(id) => {
                        const normalizedId = Number.isNaN(Number(id)) ? id : Number(id);
                        dispatch(setRoute(normalizedId));
                        setSelectedFerry("ALL");
                    }}
                    selectedFerry={selectedFerry}
                    setSelectedFerry={setSelectedFerry}
                    showAllRoutesOption={false}
                    filterFerriesByRoute={false}
                />
            )}

            {/* DEPARTURE CALENDAR */}
            <CalendarCore
                monthLabel={monthLabel}
                matrix={matrix}
                statusMap={monthStatusMap}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                onPrev={handlePrev}
                onNext={handleNext}
                showPrev={showPrev}
                loading={loadingMonth}
                showLegends={false}
            />

            {/* DEPARTURE SLOT PANEL */}
            {selectedDate && (
                !activeRoute ? (
                    <EmptyState
                        icon={Ship}
                        title="No sailings available for this date"
                        description="Please check another date"
                    />
                ) : (
                    <DateSlotsPanel
                        date={selectedDate}
                        routeId={selectedRouteId}
                        ferryFilter={selectedFerry}
                        onClose={() => dispatch(setSessionDate(null))}
                    />
                )
            )}

            {/* ===== RETURN DATE SECTION (round trip only) ===== */}
            {isRoundTrip && (
                <div className="flex flex-col gap-6 pt-4 border-t">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground sm:text-xl">
                            <ArrowLeftRight size={18} className="text-[#0f2d3a]" />
                            Select Return Date
                            {displayReturnRoute && (
                                <span className="ml-2 rounded-full border bg-gray-100 px-3 py-0.5 text-sm font-normal text-gray-600">
                                    {displayReturnRoute.routeName.replace(/\s*[-\u2013\u2014\u2192\u2194]\s*/g, " \u2192 ")}
                                </span>
                            )}
                        </h2>

                        <button
                            type="button"
                            onClick={handleSwitchToOneWay}
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#f1c7c7] text-red-500 transition hover:bg-[#fff5f5]"
                            aria-label="Switch to one way"
                            title="Switch to one way"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {!selectedDate && (
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                            <AlertCircle size={15} className="shrink-0" />
                            Please select a departure date first before choosing your return date.
                        </div>
                    )}

                    {/* RETURN CALENDAR */}
                    <CalendarCore
                        monthLabel={returnMonthLabel}
                        matrix={returnMatrix}
                        statusMap={returnMonthStatusMap}
                        selectedDate={returnSelectedDate}
                        onSelectDate={handleSelectReturnDate}
                        onPrev={handleReturnPrev}
                        onNext={handleReturnNext}
                        showPrev={showReturnPrev}
                        loading={loadingReturnMonth}
                        showLegends={false}
                    />

                    {/* RETURN SLOT PANEL */}
                    {returnSelectedDate && (
                        returnRoutesForPanel.length === 0 ? (
                            <EmptyState
                                icon={Ship}
                                title="No return sailings available for this date"
                                description="Please choose a different return date"
                            />
                        ) : !returnRoute ? (
                            <EmptyState
                                icon={Ship}
                                title="No matching return route available"
                                description="Only reverse-route sailings can be booked for the return trip"
                            />
                        ) : (
                            returnJourney?.snapshot && (
                                <DateSlotsPanel
                                    date={returnSelectedDate}
                                    routeId={returnRouteIdForPanel}
                                    ferryFilter="ALL"
                                    customRoutes={returnRoutesForPanel}
                                    customSelectedSlotId={returnSlotId}
                                    disableBeforeMinutes={disableBeforeMinutes}
                                    onSelectSlot={(slotId) => dispatch(setReturnSlot(slotId))}
                                    onClose={() => dispatch(setReturnDate(null))}
                                />
                            )
                        )
                    )}

                    {/* RETURN VALIDATION HINT */}
                    {returnSelectedDate && !returnSlotId && (
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
                            <AlertCircle size={15} className="shrink-0" />
                            Select a return time slot above to continue
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
