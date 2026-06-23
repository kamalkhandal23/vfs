import FleetHeroSection from "../features/fleet/FleetHeroSection";
import AmenitiesSection from "../features/fleet/AmenitiesSection";
import EventsBookingSection from "../features/fleet/EventsBookingSection";
import { useState } from "react";
export default function Fleet() {
  const [activeFleet, setActiveFleet] = useState("m2m-1");

  return (
    <div className="bg-neutral-light pb-16">
      <FleetHeroSection activeFleet={activeFleet} onFleetChange={setActiveFleet} />
      <AmenitiesSection activeFleet={activeFleet} />
      <EventsBookingSection />
    </div>
  );
}
