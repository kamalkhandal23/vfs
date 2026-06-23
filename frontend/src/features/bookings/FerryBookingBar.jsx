import {
  ArrowLeftRight,
  ArrowRight,
  Calendar,
  Info,
  ChevronDown
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import bellIcon from "../../assets/icons/bell.svg";
import announcementBorder from "../../assets/icons/annoucements-border.png";
import bookingBarDot from "../../assets/icons/booking-bar-dot.png";
import adultsIcon from "../../assets/icons/adults-icon.svg";
import babyIcon from "../../assets/icons/baby-icon.svg";
import petIcon from "../../assets/icons/pet-icon.svg";
import carIcon from "../../assets/icons/car-icon.svg";
import motorbikeIcon from "../../assets/icons/motorbike-icon.svg";
import bicycleIcon from "../../assets/icons/bicycle-icon.svg";
import busIcon from "../../assets/icons/bus-icon.svg";
import DatePickerPopover from "../../components/common/DatePickerPopover/DatePickerPopover";
import PassengerPopover from "../../components/common/PassengerPopOver/PassengerPopover";
import VehiclePopover from "../../components/common/VehiclePopOver/VehiclePopover";
import CityDropdown from "../../components/common/CityDropdown";
import { useNavigate } from "react-router-dom";
const FALLBACK_BOOKING = {
  tripType: "oneway",
  from: "Mumbai",
  to: "Mandwa",
  departDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  returnDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  passengers: {
    adults: 5,
    children: 1,
    pets: 2,
  },
  vehicles: {
    cars: 2,
    bikes: 2,
    bicycles: 1,
    buses: 1,
  },
};

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getRelativeDayLabel(isoDate) {
  if (!isoDate) return "";
  const target = startOfDay(new Date(isoDate));
  const today = startOfDay(new Date());
  const diff = Math.round((target - today) / (24 * 60 * 60 * 1000));
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return "";
}

function formatBookingDate(isoDate) {
  if (!isoDate) {
    return {
      shortDate: "-",
      longDate: "-",
      relativeLabel: "",
      desktopDate: "-",
      rawDate: null,
    };
  }

  const date = new Date(isoDate);

  return {
    shortDate: date.toLocaleDateString(undefined, { day: "numeric", month: "short" }),
    longDate: date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    relativeLabel: getRelativeDayLabel(isoDate),
    desktopDate: date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    rawDate: isoDate,
  };
}

export default function FerryBookingBar({
  apiEndpoint = "/api/booking-default",
  fallbackBooking = FALLBACK_BOOKING,

  onSearch,
}) {
  const [announcementsOpen, setAnnouncementsOpen] = useState(false);
  const [booking, setBooking] = useState(() => ({ ...fallbackBooking }));
  const [loading, setLoading] = useState(true);
  const [activePanel, setActivePanel] = useState(null);
  const [error, setError] = useState(null);
  const announcementsRef = useRef(null);
  const navigate = useNavigate();
  const ENABLE_API = false;
  useEffect(() => {
    if (!ENABLE_API) {
      setBooking({ ...fallbackBooking });
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchBookingDefaults() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiEndpoint, {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch booking defaults");

        const payload = await response.json();

        if (isMounted && payload) {
          setBooking((prev) => ({ ...prev, ...payload }));
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err);
        setBooking(fallbackBooking);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBookingDefaults();

    return () => {
      isMounted = false;
    };
  }, [apiEndpoint, fallbackBooking]);

  useEffect(() => {
    if (!announcementsOpen) return;
    const onPointerDown = (e) => {
      if (!announcementsRef.current) return;
      if (announcementsRef.current.contains(e.target)) return;
      setAnnouncementsOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [announcementsOpen]);

  const handleTripTypeChange = useCallback((tripType) => {
    setBooking((prev) => ({ ...prev, tripType }));
  }, []);

  const handleSwapRoute = useCallback(() => {
    setBooking((prev) => ({ ...prev, from: prev.to, to: prev.from }));
  }, []);

  const handleSearch = useCallback(() => {
    onSearch?.(booking);

    navigate("/booking/add", {
      state: booking,
    });
  }, [booking, onSearch, navigate]);

  const departMeta = useMemo(() => formatBookingDate(booking.departDate), [booking.departDate]);
  const returnMeta = useMemo(() => formatBookingDate(booking.returnDate), [booking.returnDate]);

  const passengerItems = useMemo(
    () => [
      { iconSrc: adultsIcon, label: `${booking.passengers.adults} Adults`, value: booking.passengers.adults },
      { iconSrc: babyIcon, label: `${booking.passengers.children} Child`, value: booking.passengers.children },
      { iconSrc: petIcon, label: `${booking.passengers.pets} Pets`, value: booking.passengers.pets },
    ],
    [booking.passengers]
  );

  const vehicleItems = useMemo(
    () => [
      { iconSrc: carIcon, label: `${booking.vehicles.cars} Four Wheeler` },
      { iconSrc: motorbikeIcon, label: `${booking.vehicles.bikes} Two Wheeler` },
      { iconSrc: bicycleIcon, label: `${booking.vehicles.bicycles} Bicycle` },
      { iconSrc: busIcon, label: `${booking.vehicles.buses} Bus` },
    ],
    [booking.vehicles]
  );

  return (
    <>
      <div className="hero-booking-card mx-auto hidden w-full max-w-[1200px] md:block md:max-lg:max-w-none">
        <div className="hero-booking-top flex items-start justify-between gap-6">
          <TripTypeTabs
            tripType={booking.tripType}
            onChange={handleTripTypeChange}
            desktop
          />

          <div className="hero-status mr-2 flex items-center gap-3 pt-2 text-[16px] font-semibold text-white md:max-lg:gap-2 md:max-lg:pt-1 md:max-lg:text-[13px]">
            <img src={bookingBarDot} alt="status" className="h-6 w-6 object-contain md:max-lg:h-5 md:max-lg:w-5" />
            <span>
              Schedule is live till 27th January 2026.
            </span>
          </div>
        </div>

        <div className="hero-booking-search relative mt-2 md:max-lg:mt-2">
          <div className="hero-booking-surface relative z-40 w-full overflow-visible rounded-[20px] bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="hero-booking-grid grid w-full grid-cols-[1.24fr_1fr_1fr_1.02fr_1.24fr_0.8fr] items-stretch md:max-lg:grid-cols-[1.16fr_0.95fr_0.95fr_0.95fr_1.32fr_0.82fr]">
              <RouteSelector
                from={booking.from}
                to={booking.to}
                booking={booking}
                setBooking={setBooking}
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                desktop
              />
              <DateSelector
                label="Depart"
                dateMeta={departMeta}
                desktop
                isOpen={activePanel === "depart"}
                onOpen={() =>
                  setActivePanel(prev => prev === "depart" ? null : "depart")
                }
                onClose={() => setActivePanel(null)}
                onChange={(date) => {
                  const iso = new Date(date).toISOString();
                  setBooking((prev) => ({
                    ...prev,
                    departDate: iso,
                  }));
                  setOpenCalendar(null);
                }}
              />
              <DateSelector
                label="Return"
                dateMeta={returnMeta}
                desktop
                disabled={booking.tripType === "oneway"}
                isOpen={activePanel === "return"}
                onOpen={() => {
                  if (booking.tripType === "oneway") return;
                  setActivePanel(prev => prev === "return" ? null : "return");
                }}
                onClose={() => setActivePanel(null)}
                minDate={booking.departDate}
                onChange={(date) => {
                  const iso = new Date(date).toISOString();

                  setBooking((prev) => ({
                    ...prev,
                    returnDate: iso,
                  }));

                  setOpenCalendar(null);
                }}
              />
              <PassengerBlock
                items={passengerItems}
                desktop
                isOpen={activePanel === "passenger"}
                onOpen={() =>
                  setActivePanel(prev => prev === "passenger" ? null : "passenger")
                }
                onClose={() => setActivePanel(null)}
                passengers={booking.passengers}
                setBooking={setBooking}
              />
              <VehicleBlock
                items={vehicleItems}
                desktop
                isOpen={activePanel === "vehicle"}
                onOpen={() =>
                  setActivePanel(prev => prev === "vehicle" ? null : "vehicle")
                }
                onClose={() => setActivePanel(null)}
                vehicles={booking.vehicles}
                setBooking={setBooking}
              />
              <BookingButton onClick={handleSearch} desktop />
            </div>
          </div>

          <div className="hero-announcement absolute right-0 top-[calc(100%+25px)] z-10 md:max-lg:top-[calc(100%+25px)] md:max-lg:scale-100 md:max-lg:origin-top-right">
            <div ref={announcementsRef} className="relative inline-block">
              <button
                type="button"
                onClick={() => {
                  setActivePanel(null);
                  setAnnouncementsOpen((v) => !v);
                }}
                className="group relative inline-block select-none transition-all duration-200 ease-out hover:-translate-y-[1px] hover:drop-shadow-[0_8px_14px_rgba(10,35,66,0.35)] active:translate-y-0 active:scale-[0.98]"
                aria-expanded={announcementsOpen}
                aria-haspopup="dialog"
                aria-label="Toggle announcements"
              >
                <img src={announcementBorder} alt="" className="h-[50px] w-[175px] transition-opacity duration-200 group-hover:opacity-95" />
                <span className="cursor-pointer absolute inset-0 flex items-center justify-center text-[16px] font-semibold text-white transition-colors duration-200 group-hover:text-[#EAF6FF]">
                  ANNOUNCEMENTS
                </span>
                <img src={bellIcon} alt="" className="cursor-pointer absolute -left-3 -top-4 h-10 w-10 transition-transform duration-200 group-hover:rotate-[-8deg] group-hover:scale-105" />
              </button>

              {announcementsOpen ? (
                <div
                  role="dialog"
                  aria-label="Announcements"
                  className="absolute right-0 top-full mt-3 w-[700px] origin-top-right rounded-[14px] bg-white p-4 shadow-[0_18px_40px_rgba(13,28,45,0.18)] animate-fade-in-up"
                >
                  <AnnouncementRow>
                    Vijaydurg Service Coming Soon — Subject To Final Approvals.
                  </AnnouncementRow>
                  <AnnouncementRow className="mt-3">
                    For Safety Reasons, E-Scooters Are Not Permitted Onboard M2M Ferries. Please Book Accordingly.
                  </AnnouncementRow>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="mx-auto block w-full max-w-[720px] px-4 pb-6 pt-0 md:hidden">
        <TripTypeTabs tripType={booking.tripType} onChange={handleTripTypeChange} className="mt-5" />

        <div className="mt-4 grid grid-cols-2 gap-2">
          <RouteSelector
            from={booking.from}
            to={booking.to}
            booking={booking}
            setBooking={setBooking}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            mobile
          />
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <DateSelector
            label="Depart"
            dateMeta={departMeta}
            mobile
            isOpen={activePanel === "depart"}
            onOpen={() =>
              setActivePanel(prev => prev === "depart" ? null : "depart")
            }
            onClose={() => setActivePanel(null)}
            onChange={(date) => {
              const iso = new Date(date).toISOString();
              setBooking((prev) => ({
                ...prev,
                departDate: iso,
              }));
              setOpenCalendar(null);
            }}
          />
          <DateSelector
            label="Return"
            dateMeta={returnMeta}
            mobile
            disabled={booking.tripType === "oneway"}
            isOpen={activePanel === "return"}
            onOpen={() => {
              if (booking.tripType === "oneway") return;
              setActivePanel(prev => prev === "return" ? null : "return");
            }}
            onClose={() => setActivePanel(null)}
            minDate={booking.departDate}
            onChange={(date) => {
              const iso = new Date(date).toISOString();
              setBooking((prev) => ({
                ...prev,
                returnDate: iso,
              }));
              setOpenCalendar(null);
            }}
          />
        </div>

        <PassengerBlock
          items={passengerItems}
          mobile
          isOpen={activePanel === "passenger"}
          onOpen={() =>
            setActivePanel(prev => prev === "passenger" ? null : "passenger")
          }
          onClose={() => setActivePanel(null)}
          passengers={booking.passengers}
          setBooking={setBooking}
        />

        <VehicleBlock
          items={vehicleItems}
          mobile
          isOpen={activePanel === "vehicle"}
          onOpen={() =>
            setActivePanel(prev => prev === "vehicle" ? null : "vehicle")
          }
          onClose={() => setActivePanel(null)}
          vehicles={booking.vehicles}
          setBooking={setBooking}
        />
        <BookingButton onClick={handleSearch} mobile />
      </div>
    </>
  );
}

function TripTypeTabs({ tripType, onChange, desktop = false, className = "" }) {
  if (desktop) {
    return (
      <div className={`hero-trip-toggle rounded-full bg-white shadow-[0_14px_30px_rgba(5,18,29,0.16)] ${className}`}>
        <div className="flex items-center gap-0">
          <button
            type="button"
            aria-label="One way trip"
            onClick={() => onChange("oneway")}
            className={`cursor-pointer select-none rounded-full rounded-r-none px-7 py-[11px] text-[16px] font-semibold transition-all duration-150 ease-out ${tripType === "oneway"
              ? "bg-primary-dark text-white shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:shadow-[0_0_0_4px_rgba(0,207,200,0.18)]"
              : "bg-white text-primary shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:shadow-[0_0_0_4px_rgba(19,125,197,0.16)]"
              }`}
          >
            One Way
          </button>
          <button
            type="button"
            aria-label="Round trip"
            onClick={() => onChange("round")}
            className={`cursor-pointer select-none rounded-full rounded-l-none px-7 py-[11px] text-[16px] font-semibold transition-all duration-150 ease-out ${tripType === "round"
              ? "bg-primary-dark text-white shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:shadow-[0_0_0_4px_rgba(0,207,200,0.18)]"
              : "bg-white text-primary shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:shadow-[0_0_0_4px_rgba(19,125,197,0.16)]"
              }`}
          >
            Round Trip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full rounded-lg border border-gray-200 ${className}`}>
      <button
        type="button"
        aria-label="One way trip"
        onClick={() => onChange("oneway")}
        className={`cursor-pointer select-none min-h-[40px] flex-1 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-150 ease-out active:scale-[0.98] ${tripType === "oneway"
          ? "bg-[#0A2342] text-white shadow-sm hover:shadow-md hover:shadow-[0_0_0_3px_rgba(0,207,200,0.18)]"
          : "border border-gray-200 bg-white text-gray-600 shadow-sm hover:shadow-md hover:shadow-[0_0_0_3px_rgba(19,125,197,0.14)] hover:border-[#0A2342]/20"
          }`}
      >
        ONE WAY
      </button>
      <button
        type="button"
        aria-label="Round trip"
        onClick={() => onChange("round")}
        className={`cursor-pointer select-none min-h-[40px] flex-1 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-150 ease-out active:scale-[0.98] ${tripType === "round"
          ? "bg-[#0A2342] text-white shadow-sm hover:shadow-md hover:shadow-[0_0_0_3px_rgba(0,207,200,0.18)]"
          : "border border-gray-200 bg-white text-gray-600 shadow-sm hover:shadow-md hover:shadow-[0_0_0_3px_rgba(19,125,197,0.14)] hover:border-[#0A2342]/20"
          }`}
      >
        ROUND TRIP
      </button>
    </div>
  );
}

function RouteSelector({
  from,
  to,
  onSwap,
  booking,
  setBooking,
  activePanel,
  setActivePanel,
  desktop = false,
  mobile = false,
}) {
  const cityOptions = ["Mumbai", "Mandwa", "Vijaydurg"];
  if (desktop) {
    return (
      <div className="hero-booking-fromto flex min-w-0 items-center gap-8 border-r border-[#137DC5] px-8 py-3 max-xl:gap-5 max-xl:px-5 max-xl:py-3 md:max-lg:gap-2 md:max-lg:px-3 md:max-lg:py-3">
        <div className="min-w-0 flex-1 relative">
          <p className="text-[14px] font-semibold text-primary-dark">From</p>
          <CityDropdown
            value={booking.from}
            options={cityOptions}
            onChange={(city) => {
              setBooking((prev) => ({
                ...prev,
                from: city,
              }));
            }}
            open={activePanel === "from"}
            setOpen={() =>
              setActivePanel(prev => prev === "from" ? null : "from")
            }
            onClose={() => setActivePanel(null)}
            otherValue={to}
            label="From"
          />
        </div>
        <button type="button" aria-label="Swap from and to" onClick={onSwap} className="shrink-0">
          {booking.tripType === "oneway" ? (
            <ArrowRight
              size={20}
              className="mt-6 text-primary md:max-lg:mt-4 md:max-lg:h-[18px] md:max-lg:w-[18px]"
            />
          ) : (
            <ArrowLeftRight
              size={20}
              className="mt-6 text-primary md:max-lg:mt-4 md:max-lg:h-[18px] md:max-lg:w-[18px]"
            />
          )}
        </button>
        <div className="min-w-0 flex-1 relative">
          <p className="text-[14px] font-semibold text-primary-dark">To</p>
          <CityDropdown
            value={booking.to}
            options={cityOptions}
            onChange={(city) => {
              setBooking((prev) => ({
                ...prev,
                to: city,
              }));
            }}

            open={activePanel === "to"}
            setOpen={() =>
              setActivePanel(prev => prev === "to" ? null : "to")
            }
            onClose={() => setActivePanel(null)}
            otherValue={from}
            label="To"
          />
        </div>
      </div>
    );
  }

  if (mobile) {
    return (
      <>
        {/* FROM */}
        <div className="rounded-lg border border-gray-200 bg-white px-3 z-30 py-2.5 relative">
          <p className="text-[11px] font-medium text-gray-500">From</p>

          <CityDropdown
            value={from}
            options={cityOptions}
            onChange={(city) => {
              setBooking((prev) => ({
                ...prev,
                from: city,
              }));
            }}
            open={activePanel === "from"}
            setOpen={() =>
              setActivePanel(prev => prev === "from" ? null : "from")
            }
            onClose={() => setActivePanel(null)}
            otherValue={to}
          />
        </div>

        {/* TO */}
        <div className="rounded-lg border border-gray-200 bg-white z-30 px-3 py-2.5 relative">
          <p className="text-[11px] font-medium text-gray-500">To</p>

          <CityDropdown
            value={to}
            options={cityOptions}
            onChange={(city) => {
              setBooking((prev) => ({
                ...prev,
                to: city,
              }));
            }}

            open={activePanel === "to"}
            setOpen={() =>
              setActivePanel(prev => prev === "to" ? null : "to")
            }
            onClose={() => setActivePanel(null)}
            otherValue={from}
          />
        </div>
      </>

    );
  }

  return null;
}

function DateSelector({
  label,
  dateMeta,
  desktop = false,
  mobile = false,
  disabled = false,
  isOpen,
  onOpen,
  onClose,
  onChange,
  minDate,
}) {
  if (desktop) {
    const showRelativeChip = label === "Depart" && dateMeta.relativeLabel;
    return (
      <div className={`min-w-0 flex-1 border-r border-[#137DC5] px-6 py-3 md:max-lg:px-4`}>
        <div className="flex items-center gap-2 md:max-lg:gap-1">
          <p className="text-[13px] font-semibold text-primary-dark md:max-lg:text-[12px]">{label}</p>
          {showRelativeChip ? (
            <span className="shrink-0 rounded-[6px] bg-[#475E75] px-2 py-[2px] text-[10px] font-semibold text-white md:max-lg:px-1 md:max-lg:py-[1px] md:max-lg:text-[7px]">
              {dateMeta.relativeLabel}
            </span>
          ) : null}
        </div>
        <div className="relative">

          {/* CLICKABLE */}
          <p
            onClick={() => {
              if (disabled) return;
              onOpen();
            }}
            className={`mt-3 flex cursor-pointer items-center gap-1 whitespace-nowrap text-[15px] font-semibold ${disabled ? "opacity-50 cursor-not-allowed" : "text-primary-dark"
              }`}
          >
            {dateMeta.desktopDate}
          </p>

          {/* CALENDAR */}
          {isOpen && (
            <DatePickerPopover
              value={dateMeta.rawDate}
              minDate={minDate}
              onChange={onChange}
              onClose={onClose}
            />
          )}

        </div>
      </div>
    );
  }

  if (mobile) {
    return (
      <div
        className={`relative rounded-lg border border-gray-200 bg-white px-3 py-2.5 ${disabled ? "opacity-50" : "cursor-pointer"
          }`}
        onClick={() => {
          if (disabled) return;
          onOpen();
        }}
      >
        <div className="flex items-start justify-between gap-1">
          <span className="text-[11px] text-gray-500">{label}</span>

          <div className="flex items-center gap-1.5">
            {dateMeta.relativeLabel && (
              <span className="rounded-md bg-[#0A2342] px-1.5 py-0.5 text-[8px] text-white">
                {dateMeta.relativeLabel}
              </span>
            )}
            <Calendar size={14} className="text-gray-400" />
          </div>
        </div>

        <div className="mt-2">
          <span className="text-[16px] font-bold text-[#0A2342]">
            {dateMeta.shortDate}
          </span>
          <p className="text-[11px] text-gray-500">
            {dateMeta.longDate}
          </p>
        </div>

        {/* CALENDAR */}
        {isOpen && (
          <DatePickerPopover
            value={dateMeta.rawDate}
            minDate={minDate}
            onChange={onChange}
            onClose={onClose}
          />
        )}
      </div>
    );
  }

  return null;
}

function PassengerBlock({
  items,
  desktop = false,
  mobile = false,
  isOpen,
  onOpen,
  onClose,
  passengers,
  setBooking,
}) {
  const wrapperClass = desktop
    ? "hero-booking-passengers min-w-0 flex-1 border-r border-[#137DC5] px-6 py-3 md:max-lg:px-4"
    : "mt-3 rounded-lg border border-gray-200 bg-white px-3 py-3";

  const listClass = desktop
    ? "mt-3 grid grid-cols-3 items-center gap-2 text-[16px] font-semibold text-primary-dark md:max-lg:gap-1.5"
    : "mt-2 grid grid-cols-3 gap-2";

  const textClass = desktop
    ? "truncate text-[14px] font-semibold text-primary-dark"
    : "text-[13px] font-bold text-[#0A2342]";

  return (
    <div
      className={`${wrapperClass} cursor-pointer`}
      onClick={() => {
        onOpen();
      }}
      style={{ position: "relative" }}
    >
      <p
        onClick={() => {
          console.log("clicked passenger");
          onOpen();
        }}
        className={`${textClass} cursor-pointer`}
      >
        Passengers
      </p>
      <div className={listClass}>
        {items.map(({ iconSrc, label, value }) => (
          <span key={label} className="flex min-w-0 items-center justify-center gap-2 text-[14px] font-semibold text-[#0A2342] md:max-lg:gap-1.5 md:max-lg:text-[11px]">
            <img
              src={iconSrc}
              alt=""
              className="h-[20px] w-[20px] shrink-0 object-contain md:max-lg:h-[15px] md:max-lg:w-[15px]"
            />
            <span className="leading-none tabular-nums">{desktop ? value : label}</span>
          </span>
        ))}
      </div>


      {isOpen && (
        <PassengerPopover
          passengers={passengers}
          onChange={(updated) => {
            setBooking((prev) => ({
              ...prev,
              passengers: updated,
            }));
          }}
          onClose={onClose}
        />
      )}


    </div>

  );
}

function VehicleBlock({
  items,
  desktop = false,
  mobile = false,
  isOpen,
  onOpen,
  onClose,
  vehicles,
  setBooking,
}) {
  if (desktop) {
    return (
      <div
        onClick={onOpen}
        className="hero-booking-vehicles relative z-30 min-w-0 flex-1 border-r border-[#137DC5] px-6 py-3 md:max-lg:px-3 cursor-pointer"
      >
        <p className="truncate text-[14px] font-semibold text-primary-dark md:max-lg:text-[13px]">Vehicles</p>
        <div className="mt-3 grid grid-cols-4 items-center gap-2 text-[16px] font-semibold text-primary-dark md:max-lg:gap-1">
          {items.map(({ iconSrc, label }) => (
            <span key={label} className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap md:max-lg:gap-1">
              <img
                src={iconSrc}
                alt=""
                className="h-[20px] w-[20px] shrink-0 object-contain md:max-lg:h-[15px] md:max-lg:w-[15px]"
              />
              <span className="text-[14px] font-semibold leading-none tabular-nums text-[#0A2342] md:max-lg:text-[11px]">{label.split(" ")[0]}</span>
            </span>
          ))}
        </div>
        {isOpen && (
          <VehiclePopover
            vehicles={vehicles}
            onChange={(updated) => {
              setBooking((prev) => ({
                ...prev,
                vehicles: updated,
              }));
            }}
            onClose={onClose}
          />
        )}
      </div>
    );
  }

  if (mobile) {
    return (
      <div
        className="relative mt-3 rounded-lg border border-gray-200 bg-white px-3 py-3 cursor-pointer"
        onClick={onOpen}
      >
        <p className="text-[13px] font-bold text-[#0A2342]">Vehicles</p>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
          {items.map(({ iconSrc, label }) => (
            <div key={label} className="flex items-start gap-2 text-[11px] font-semibold text-[#0A2342]">
              <img
                src={iconSrc}
                alt=""
                className="h-[18px] w-[18px] shrink-0 object-contain"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* POPUP */}
        {isOpen && (
          <VehiclePopover
            vehicles={vehicles}
            onChange={(updated) => {
              setBooking((prev) => ({
                ...prev,
                vehicles: updated,
              }));
            }}
            onClose={onClose}
          />
        )}
      </div>
    );
  }

  return null;
}

function BookingButton({ onClick, desktop = false, mobile = false }) {
  if (desktop) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Search ferries"
        className="hero-search-button relative z-[1] -mr-px flex h-full w-[calc(100%+1px)] min-w-0 flex-shrink-0 items-center justify-center rounded-r-[20px] bg-[#0A2342] px-6 text-[16px] font-semibold tracking-[0.01em] text-white transition-all duration-150 ease-out hover:bg-[#081c36] hover:brightness-105 active:scale-[0.97] active:brightness-110 md:max-lg:px-2.5 md:max-lg:text-[13px]"
      >
        SEARCH
      </button>
    );
  }

  if (mobile) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Search ferries"
        className="mt-6 min-h-[48px] w-full rounded-lg bg-[#0A2342] px-4 text-[15px] font-semibold text-white shadow-sm transition-all duration-150 ease-out hover:bg-[#081c36] hover:brightness-105 active:scale-[0.98] active:brightness-110"
      >
        Search Ferries
      </button>
    );
  }

  return null;
}

function AnnouncementRow({ children, className = "" }) {
  return (
    <div className={`flex items-start gap-2 text-[13px] leading-[1.45] text-[#24384d] ${className}`}>
      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#EAF3F8] text-primary">
        <Info size={14} />
      </span>
      <p>{children}</p>
    </div>
  );
}
