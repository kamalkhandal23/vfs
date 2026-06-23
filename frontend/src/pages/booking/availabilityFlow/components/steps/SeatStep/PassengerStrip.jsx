/* eslint-disable react/prop-types */
import { Check } from "lucide-react";

const getInitial = (name = "") => name.trim().charAt(0).toUpperCase() || "P";

const PassengerStrip = ({ passengers, assignments, activePassengerIdx, onSelectPassenger }) => {
  const assignmentMap = assignments.reduce((map, item) => {
    map[item.passengerIdx] = item;
    return map;
  }, {});

  return (
    <section className="space-y-2 rounded-2xl border border-[#c8d5e3] bg-white p-3 sm:p-4">
      <p className="text-sm font-medium text-[#0f2942]">
        {Object.keys(assignmentMap).length}/{passengers.length} passengers assigned
      </p>

      <div className=" h-fit max-h-[172px] overflow-y-auto pr-1 sm:max-h-[196px]">
        <div className="flex flex-wrap gap-2">
          {passengers.map((passenger, index) => {
            const assignment = assignmentMap[index];
            const isActive = index === activePassengerIdx;

            return (
              <button
                key={index}
                type="button"
                onClick={() => onSelectPassenger(index)}
                className={`min-w-[145px] rounded-2xl border px-3 py-2 text-left transition ${isActive
                    ? "border-[#0c2f64] bg-[#0c2f64] text-white"
                    : "border-[#d4dee9] bg-white text-[#0f2942] hover:border-[#9cb1c6]"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${isActive ? "bg-white/15 text-white" : "bg-[#e7edf5] text-[#0f2942]"
                      }`}
                  >
                    {getInitial(passenger.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{passenger.name || `Passenger ${index + 1}`}</p>
                    <p className={`text-xs ${isActive ? "text-white/80" : "text-[#5e7690]"}`}>
                      {assignment ? `${assignment.seatId} | Rs ${assignment.price}` : "Tap to assign"}
                    </p>
                  </div>
                  {assignment ? <Check size={15} className={isActive ? "text-[#22c55e]" : "text-[#16a34a]"} /> : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PassengerStrip;
