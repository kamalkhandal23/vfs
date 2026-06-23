import BookingListSection from "../features/my-bookings/BookingListSection";
import BookingHeroSection from "../features/my-bookings/BookingHeroSection";
import { useState } from "react";

export default function MyBookings() {
  const [activeBooking, setActiveBooking] = useState(null);

  return (
    <div className="bg-neutral-light pb-16">
      <BookingHeroSection />
      <BookingListSection activeBooking={activeBooking} onBookingChange={setActiveBooking} />
      
    </div>
  );
}

