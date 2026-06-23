import { useSelector } from "react-redux";
import {
  selectSeatPassengerFlowEnabled,
  selectStep,
} from "../../../../features/booking/availabilitySession/availabilitySelectors";
import TripStep from "./steps/TripStep/TripStep";
import RouteStep from "./steps/RouteStep";
import DateStep from "./steps/DateStep";
import ReviewStep from "./steps/ReviewStep/ReviewStep";
import PassengersStep from "./steps/PassengersStep";
import SeatStep from "./steps/SeatStep";

const StepRenderer = () => {
  const step = useSelector(selectStep);
  const isSeatPassengerFlowEnabled = useSelector(selectSeatPassengerFlowEnabled);

  switch (step) {
    case "route":
      return <RouteStep />;
    case "date":
      return <DateStep />;
    case "trip":
      return <TripStep />;
    case "passengers":
      return isSeatPassengerFlowEnabled ? <PassengersStep /> : <TripStep />;
    case "seats":
      return isSeatPassengerFlowEnabled ? <SeatStep /> : <TripStep />;
    case "confirm":
      return <ReviewStep />;
    default:
      return null;
  }
};

export default StepRenderer;