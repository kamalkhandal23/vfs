import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchBookingConfig } from "../../features/booking/bookingConfig/bookingConfigSlice";
import { loadCarModelSizeMap } from "../../features/booking/vehicleCatalog/vehicleCatalogSlice";

const showToastFallback = (type, message) => {
  const prefix = type === "danger" ? "Error" : "Info";
  window.alert(`${prefix}: ${message}`);
};

export default function BookingAppShell() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookingConfig());
    dispatch(loadCarModelSizeMap());
  }, [dispatch]);

  useEffect(() => {
    if (!window.showToast) {
      window.showToast = showToastFallback;
    }

    return () => {
      if (window.showToast === showToastFallback) {
        delete window.showToast;
      }
    };
  }, []);

  return (
    <div className="booking-shell px-3 pb-4 pt-[88px] sm:px-5 sm:pb-5 sm:pt-[96px] lg:px-8 lg:pt-[104px]">
      <div className="mx-auto min-h-[calc(100dvh-92px)] w-full max-w-[1400px] overflow-visible sm:min-h-[calc(100dvh-101px)] lg:h-[calc(100dvh-109px)] lg:min-h-0 lg:overflow-hidden [--booking-primary:#0f2d3a] [--booking-secondary:#eef6fb]">
        <Outlet />
      </div>
    </div>
  );
}
