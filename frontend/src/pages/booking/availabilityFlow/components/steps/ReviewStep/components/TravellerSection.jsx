import { useSelector } from "react-redux";
import { CircleAlert, UserRound } from "lucide-react";
import TravellerCard from "./TravellerCard";
import { selectGuestDetails, selectTravellers } from "../../../../../../../features/booking/availabilitySession/availabilitySelectors";

const TravellerSection = () => {
  const travellers = useSelector(selectTravellers);
  const guestDetails = useSelector(selectGuestDetails);

  return (
    <div className="rounded-[22px] max-h-[520px] overflow-auto custom-scroll border border-[#c8d5e3] bg-white">
      <div className="flex items-center justify-between sticky top-0 bg-white p-4 sm:p-5">
        <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#071c3d] sm:text-xl">
          <UserRound size={19} />
          Traveller Information
        </h3>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#ffcf9d] bg-[#fff3e6] px-3 py-1.5 text-xs font-medium text-[#f97316]">
          <CircleAlert size={14} />
          All passengers required
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-5">
        {Array.from({ length: travellers.passengers }).map((_, i) => (
          <TravellerCard key={i} index={i} traveller={guestDetails[i]} />
        ))}
      </div>
    </div>
  );
};

export default TravellerSection;
