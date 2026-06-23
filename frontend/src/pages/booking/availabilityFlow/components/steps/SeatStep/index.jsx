import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as availabilitySeatSelectors from "../../../../../../features/booking/availabilitySession/availabilitySelectors";

import {
  selectActiveSeatPassengerIdx,
  selectGuestDetails,
  selectIsRoundTrip,
  selectLockedSeatCategoryCode,
  selectLockedReturnSeatCategoryCode,
  selectReturnCategoryId,
  selectReturnSeatAssignments,
  selectReturnSlotId,
  selectSeatAssignments,
  selectTravellers,
  selectActiveReturnSeatPassengerIdx,
} from "../../../../../../features/booking/availabilitySession/availabilitySelectors";
import {
  assignSeatToPassenger,
  assignReturnSeatToPassenger,
  startConfirmHoldTimer,
  setCategory,
  setActiveSeatPassenger,
  setActiveReturnSeatPassenger,
  setReturnCategory,
  setStep,
  switchSeatClass,
  switchReturnSeatClass,
  unassignSeat,
  unassignReturnSeat,
} from "../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import SeatClassPanel from "./SeatClassPanel";
import PassengerStrip from "./PassengerStrip";
import SeatMapPanel from "./SeatMapPanel";
import ClassSwitchModal from "./ClassSwitchModal";
import { createSeatHold } from "../../../../../../features/booking/availabilitySession/availabilityThunks";

const SeatStep = () => {
  const dispatch = useDispatch();

  const travellers = useSelector(selectTravellers);
  const guestDetails = useSelector(selectGuestDetails);
  const isRoundTrip = useSelector(selectIsRoundTrip);
  const returnSlotId = useSelector(selectReturnSlotId);
  const returnCategoryId = useSelector(selectReturnCategoryId);
  const seatAssignments = useSelector(selectSeatAssignments);
  const returnSeatAssignments = useSelector(selectReturnSeatAssignments);
  const activePassengerIdx = useSelector(selectActiveSeatPassengerIdx);
  const activeReturnPassengerIdx = useSelector(selectActiveReturnSeatPassengerIdx);
  const lockedSeatCategoryCode = useSelector(selectLockedSeatCategoryCode);
  const lockedReturnSeatCategoryCode = useSelector(selectLockedReturnSeatCategoryCode);
  const classes = useSelector(availabilitySeatSelectors.selectDynamicSeatCategories);
  const selectedSeatCategory = useSelector(availabilitySeatSelectors.selectSelectedDynamicSeatCategory);
  const returnClasses = useSelector(availabilitySeatSelectors.selectDynamicReturnSeatCategories);
  const selectedReturnSeatCategory = useSelector(availabilitySeatSelectors.selectSelectedDynamicReturnSeatCategory);
  const [activeLeg, setActiveLeg] = useState("departure");
  const [selectedClassCode, setSelectedClassCode] = useState(null);
  const [pendingSwitchRequest, setPendingSwitchRequest] = useState(null);

  const isReturnEnabled = isRoundTrip && Boolean(returnSlotId) && Boolean(returnCategoryId);
  const currentClasses = activeLeg === "return" ? returnClasses : classes;
  const currentSelectedCategory = activeLeg === "return" ? selectedReturnSeatCategory : selectedSeatCategory;
  const currentAssignments = activeLeg === "return" ? returnSeatAssignments : seatAssignments;
  const currentActivePassengerIdx = activeLeg === "return" ? activeReturnPassengerIdx : activePassengerIdx;
  const currentLockedCategoryCode = activeLeg === "return" ? lockedReturnSeatCategoryCode : lockedSeatCategoryCode;

  useEffect(() => {
    if (!currentClasses.length) {
      setSelectedClassCode(null);
      return;
    }

    setSelectedClassCode((current) => {
      if (current && currentClasses.some((item) => item.code === current)) {
        return current;
      }

      return currentSelectedCategory?.code ?? currentClasses[0]?.code ?? null;
    });
  }, [currentClasses, currentSelectedCategory]);

  useEffect(() => {
    if (!isReturnEnabled && activeLeg === "return") {
      setActiveLeg("departure");
    }
  }, [isReturnEnabled, activeLeg]);

  const totalTravellers =
    travellers.passengers + (travellers.infants || 0);

  const passengers = useMemo(
    () =>
      Array.from({ length: totalTravellers }).map((_, index) => ({
        name: guestDetails?.[index]?.name || "",
        isInfant: index >= travellers.passengers,
      })),
    [guestDetails, travellers.passengers, travellers.infants]
  );

  const selectedClass = currentClasses.find((item) => item.code === selectedClassCode) || currentClasses[0] || null;

  const applySelectedClass = (nextClass) => {
    if (!nextClass) return;

    setSelectedClassCode(nextClass.code);
    if (activeLeg === "return") {
      dispatch(setReturnCategory(nextClass.apiCategoryId));
      return;
    }
    dispatch(setCategory(nextClass.apiCategoryId));
  };

  const handleClassSelect = (classCode) => {
    if (classCode === selectedClassCode) return;

    const nextClass = currentClasses.find((item) => item.code === classCode);
    if (!nextClass) return;

    if (
      currentLockedCategoryCode
      && currentLockedCategoryCode !== classCode
      && currentAssignments.length > 0
    ) {
      setSelectedClassCode(nextClass.code);
      return;
    }

    applySelectedClass(nextClass);
  };

  const handleSeatClick = (seatPayload) => {
    if (!selectedClass) return;

    const {
      rowLabel,
      colNum,
      seatId,
      state,
      price: seatPrice,
      apiCategoryId: seatApiCategoryId,
      apiCategoryName: seatApiCategoryName,
    } = seatPayload;

    if (state === "occupied" || state === "other_pax" || state === "blocked") return;

    if (
      currentLockedCategoryCode
      && currentLockedCategoryCode !== selectedClass.code
      && currentAssignments.length > 0
    ) {
      setPendingSwitchRequest({
        classCode: selectedClass.code,
        seatPayload,
        leg: activeLeg,
      });
      return;
    }

    const resolvedApiCategoryId = seatApiCategoryId ?? selectedClass.apiCategoryId;
    const resolvedApiCategoryName = seatApiCategoryName ?? selectedClass.name;

    if (activeLeg === "return") {
      dispatch(setReturnCategory(resolvedApiCategoryId));
    } else {
      dispatch(setCategory(resolvedApiCategoryId));
    }

    const currentForPassenger = currentAssignments.find(
      (item) => item.passengerIdx === currentActivePassengerIdx
    );

    if (currentForPassenger?.seatId === seatId && currentForPassenger?.categoryCode === selectedClass.code) {
      if (activeLeg === "return") {
        dispatch(unassignReturnSeat({ passengerIdx: currentActivePassengerIdx }));
      } else {
        dispatch(unassignSeat({ passengerIdx: currentActivePassengerIdx }));
      }
      return;
    }

    const assignmentPayload = {
      passengerIdx: currentActivePassengerIdx,
      seatId,
      rowLabel,
      colNum,
      categoryCode: selectedClass.code,
      categoryName: selectedClass.name,
      price: seatPrice ?? selectedClass.price,
      apiCategoryId: resolvedApiCategoryId,
      apiCategoryName: resolvedApiCategoryName,
      isInfant: currentActivePassengerIdx >= travellers.passengers, // ✅ ADD THIS

    };

    if (activeLeg === "return") {
      dispatch(assignReturnSeatToPassenger(assignmentPayload));
    } else {
      dispatch(assignSeatToPassenger(assignmentPayload));
    }
  };

  const pendingClasses = pendingSwitchRequest?.leg === "return" ? returnClasses : classes;
  const pendingClass = pendingClasses.find((item) => item.code === pendingSwitchRequest?.classCode);

  if (!currentClasses.length || !selectedClass) {
    return (
      <div className="rounded-2xl border border-[#c8d5e3] bg-white px-5 py-8 text-center text-sm text-[#64748b]">
        Seat layout is not available for this sailing yet.
      </div>
    );
  }

  return (
    <>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[#c8d5e3] bg-white px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#071c3d] sm:text-2xl">
                Choose Your Seats
              </h2>
              {/* <p className="text-sm text-[#64748b]">Cruise 20 live layout. All passengers must use one class.</p> */}
            </div>
            <button
              type="button"
              onClick={async () => {
                const res = await dispatch(
                  createSeatHold({ leg: activeLeg, skipSeatSelection: true })
                );

                if (createSeatHold.fulfilled.match(res)) {
                  dispatch(startConfirmHoldTimer(5 * 60 * 1000));
                  dispatch(setStep("confirm"));
                }
              }}
              className="text-sm font-medium text-[#0c2f64] underline underline-offset-4"
            >
              Skip seat selection
            </button>
          </div>
        </div>

        {isReturnEnabled ? (
          <div className="rounded-2xl border border-[#c8d5e3] bg-white p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveLeg("departure")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${activeLeg === "departure" ? "bg-[#0f2d3a] text-white" : "bg-[#f1f5f9] text-[#0f2d3a]"}`}
              >
                Departure Seats
              </button>
              <button
                type="button"
                onClick={() => setActiveLeg("return")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${activeLeg === "return" ? "bg-[#0f2d3a] text-white" : "bg-[#f1f5f9] text-[#0f2d3a]"}`}
              >
                Return Seats
              </button>
            </div>
          </div>
        ) : null}

        <PassengerStrip
          passengers={passengers}
          assignments={currentAssignments}
          activePassengerIdx={currentActivePassengerIdx}
          onSelectPassenger={(index) => dispatch(activeLeg === "return" ? setActiveReturnSeatPassenger(index) : setActiveSeatPassenger(index))}
        />

        <div className="flex flex-col gap-4 lg:flex-row">
          <SeatClassPanel
            classes={currentClasses}
            selectedClassCode={selectedClass.code}
            onSelectClass={handleClassSelect}
            assignedCount={currentAssignments.length}
          />

          <div className="min-w-0 w-full flex flex-col gap-1">
            <SeatMapPanel
              selectedClass={selectedClass}
              onSeatClick={handleSeatClick}
            />
            {currentAssignments.length > 0 ? (
              <section className="rounded-2xl border border-[#c8d5e3] bg-white overflow-hidden ">
                <div className="flex items-center justify-between border-b border-[#c8d5e3] bg-[#f8fbff] px-4 py-3">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0c2f64]">{activeLeg === "return" ? "Return" : "Departure"} Seat Assignment Summary</h3>
                  <span className="text-xs font-medium text-[#56708d]">{currentAssignments.length}/{totalTravellers} assigned</span>
                </div>

                <div className="divide-y divide-[#c8d5e3] max-h-[172px] overflow-y-auto pr-1 sm:max-h-[196px] custom-scroll">
                  {passengers.map((passenger, index) => {
                    const assignment = currentAssignments.find((item) => item.passengerIdx === index);

                    return (
                      <div key={index} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eaf1f8] text-xs font-semibold text-[#0f2942]">
                            {(passenger.name || "P").trim().charAt(0).toUpperCase() || "P"}
                          </span>
                          <span className="font-semibold text-[#0f2942]">
                            {passenger.name ||
                              (passenger.isInfant
                                ? `Infant ${index - travellers.passengers + 1}`
                                : `Passenger ${index + 1}`)}
                          </span>

                          {passenger.isInfant && (
                            <span className="text-[10px] text-blue-600 ml-1">(Infant)</span>
                          )}
                        </div>

                        <div className="text-right">
                          {assignment ? (
                            <>
                              <p className="font-semibold text-[#0f2942]">Seat {assignment.seatId}</p>
                              <p className="text-xs text-[#5f7690]">{assignment.categoryName} | Rs {assignment.price}</p>
                            </>
                          ) : (
                            <p className="text-xs text-[#94a3b8]">Not assigned</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        </div>


      </div>
      <ClassSwitchModal
        open={!!pendingClass}
        title={pendingClass?.name || "this class"}
        assignedCount={currentAssignments.length}
        onClose={() => setPendingSwitchRequest(null)}
        onConfirm={() => {
          if (!pendingClass) return;

          if (pendingSwitchRequest?.leg === "return") {
            dispatch(switchReturnSeatClass(pendingClass.code));
          } else {
            dispatch(switchSeatClass(pendingClass.code));
          }
          applySelectedClass(pendingClass);

          if (pendingSwitchRequest?.seatPayload) {
            const { rowLabel, colNum, seatId } = pendingSwitchRequest.seatPayload;

            const assignmentPayload = {
              passengerIdx: pendingSwitchRequest?.leg === "return"
                ? activeReturnPassengerIdx
                : activePassengerIdx,
              seatId,
              rowLabel,
              colNum,
              categoryCode: pendingClass.code,
              categoryName: pendingClass.name,
              price: pendingSwitchRequest?.seatPayload?.price ?? pendingClass.price,
              apiCategoryId: pendingClass.apiCategoryId,
              apiCategoryName: pendingClass.name,
              isInfant:
                (pendingSwitchRequest?.leg === "return"
                  ? activeReturnPassengerIdx
                  : activePassengerIdx) >= travellers.passengers, // 🔥 IMPORTANT
            };
            if (pendingSwitchRequest?.leg === "return") {
              dispatch(assignReturnSeatToPassenger(assignmentPayload));
            } else {
              dispatch(assignSeatToPassenger(assignmentPayload));
            }
          }

          setPendingSwitchRequest(null);
        }}
      />
    </>
  );
};

export default SeatStep;
