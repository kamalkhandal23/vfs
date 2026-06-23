import boat from "../../assets/icons/booking-boat.png";
import { useState } from "react";
import { Ship, ArrowRight } from "lucide-react";

export default function BookingListSection() {
    const [activeTab, setActiveTab] = useState("past");
    const [showUpcomingCard, setShowUpcomingCard] = useState(false);

    const trips = [
        {
            from: "Mandwa",
            to: "Mumbai",
            subtitle: "M2M Princess • Skoda Klyaq Zone 17A, 17B, 17C",
            extra: "V1J4 • ANUKRIT • AKSHAY",
            date: "Fri 11 Apr - Sun, 27 Apr",
        },
        {
            from: "Mumbai",
            to: "Vijaydurg",
            subtitle: "M2M 1 • Skoda Klyaq Zone 25A",
            extra: "V1J4",
            date: "Thu 11 Mar",
        },
    ];

    const upcomingTrips = [
        {
            from: "Mumbai",
            to: "Vijaydurg",
            date: "Thu 11 Mar",
            timeFrom: "20:15",
            timeTo: "23:25",
            duration: "3h 10m",
            ferry: "M2M 1",
            seat: "Economy",
            vehicle: "Car - Maruti Suzuki Swift",
            luggage: "15 Kg",
            traveler: "Mr M S VJAI",
            pnr: "P5LM6",
            seatNo: "12A",
            bookingId: "IF123456358222",
            status: "Confirmed",
        },
    ];

    return (
        <section className="bg-[#EAF4FA] px-4 pb-12 pt-20">

            {/* TABS */}
            <div className="flex justify-center">
                <div className="flex bg-[#ffffff] rounded-full p-[5px] w-full max-w-[420px] shadow-inner">

                    {/* PAST */}
                    <button
                        onClick={() => {
                            setActiveTab("past");
                            setShowUpcomingCard(false);
                        }}
                        className={`flex-1 py-2 text-[12px] font-medium rounded-full transition ${activeTab === "past"
                                ? "bg-[#0A2342] text-white shadow"
                                : "text-[#0A2342]"
                            }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Ship size={14} />
                            Past Trips
                        </span>
                    </button>

                    {/* UPCOMING */}
                    <button
                        onClick={() => {
                            setActiveTab("upcoming");
                            setShowUpcomingCard(false); // IMPORTANT
                        }}
                        className={`flex-1 py-2 text-[12px] font-medium rounded-full transition ${activeTab === "upcoming"
                                ? "bg-[#0A2342] text-white shadow"
                                : "text-[#0A2342]"
                            }`}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Ship size={14} />
                            Upcoming Trips
                        </span>
                    </button>

                </div>
            </div>

            {/* CARDS */}
            <div className="mt-10 space-y-6 max-w-[720px] mx-auto">

                {showUpcomingCard ? (

                    // SHOW DETAILS CARD
                    upcomingTrips.map((trip, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-[12px] p-6 border border-[#E3E8ED] shadow-sm"
                        >

                            <div className="flex justify-between text-[12px] text-[#6B7A8C]">
                                <p>Booking ID: {trip.bookingId}</p>
                                <p className="text-green-600">Status: {trip.status}</p>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button className="flex-1 border rounded-[8px] py-2 text-[13px]">
                                    E-Ticket
                                </button>
                                <button className="flex-1 border rounded-[8px] py-2 text-[13px]">
                                    Invoice
                                </button>
                            </div>

                            <div className="mt-4">
                                <p className="text-[16px] font-semibold text-[#0A2342]">
                                    {trip.from} → {trip.to}
                                </p>
                                <p className="text-[12px] text-[#6B7A8C]">
                                    {trip.ferry} • {trip.duration} • {trip.seat}
                                </p>
                            </div>

                            <div className="flex justify-between mt-4 text-center">
                                <div>
                                    <p className="font-semibold">{trip.timeFrom}</p>
                                    <p className="text-[11px] text-gray-500">{trip.from}</p>
                                </div>

                                <div className="text-[11px] text-gray-400 mt-2">
                                    {trip.duration}
                                </div>

                                <div>
                                    <p className="font-semibold">{trip.timeTo}</p>
                                    <p className="text-[11px] text-gray-500">{trip.to}</p>
                                </div>
                            </div>

                            <div className="mt-4 text-[12px] text-[#6B7A8C]">
                                <p>Vehicle: {trip.vehicle}</p>
                                <p>Luggage: {trip.luggage}</p>
                            </div>

                            <div className="mt-4 bg-[#F4F7FA] p-3 rounded-[8px] text-[12px]">
                                <div className="flex justify-between text-gray-500">
                                    <p>Traveller</p>
                                    <p>PNR</p>
                                    <p>Seat</p>
                                </div>

                                <div className="flex justify-between font-medium mt-1">
                                    <p>{trip.traveler}</p>
                                    <p>{trip.pnr}</p>
                                    <p>{trip.seatNo}</p>
                                </div>
                            </div>

                        </div>
                    ))

                ) : activeTab === "upcoming" ? (

                    //  EMPTY STATE
                    <div className="flex flex-col items-center justify-center mt-16">
                        <img src={boat} className="w-[180px]" />
                        <p className="mt-4 text-[14px] text-[#6B7A8C]">
                            You don’t have bookings yet
                        </p>
                    </div>

                ) : (

                    //  PAST TRIPS
                    trips.map((trip, i) => (
                        <div
                            key={i}
                            className="bg-[#ffffff] rounded-[12px] px-9 py-8 flex justify-between items-start shadow-sm border border-[#E3E8ED]"
                        >

                            <div className="flex gap-4">
                                <div className="w-9 h-9 bg-[#E6EEF6] rounded-full flex items-center justify-center">
                                    <Ship size={16} className="text-[#0A2342]" />
                                </div>

                                <div>
                                    <p className="text-[18px] font-semibold text-[#0A2342]">
                                        {trip.from} → {trip.to}
                                    </p>

                                    <p className="text-[13px] text-[#6B7A8C] mt-[2px]">
                                        {trip.subtitle}
                                    </p>

                                    <p className="text-[12px] text-[#9AA7B6] mt-[2px]">
                                        {trip.extra}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right min-w-[120px] flex flex-col items-end">
                                <p className="text-[12px] text-[#6B7A8C]">
                                    {trip.date}
                                </p>

                                <button 
                                    onClick={() => setShowUpcomingCard(true)}
                                className="mt-2 flex items-center gap-1 text-[13px] text-[#0A2342] font-medium group">
                                    <span>View Details</span>
                                    <ArrowRight
                                        size={14}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </button>
                            </div>

                        </div>
                    ))

                )}

            </div>

            {/* BOAT ONLY FOR PAST */}
            {activeTab === "past" && !showUpcomingCard && (
                <div className="flex justify-center mt-10">
                    <img src={boat} className="w-[250px]" />
                </div>
            )}

        </section>
    );
}