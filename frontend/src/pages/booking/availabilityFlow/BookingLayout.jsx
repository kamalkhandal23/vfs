import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { selectBookingSuccess, selectSnapshot, selectStep } from "../../../features/booking/availabilitySession/availabilitySelectors";
import StepRenderer from "./components/StepRenderer";
import { Navigate } from "react-router-dom";
import BookingHeader from "./components/Header/BookingHeader";
import LeftPanel from "./components/LeftPreview/LeftPanel";
import BookingFooter from "./components/BookingFooter";

const BookingLayout = () => {
  const snapshot = useSelector(selectSnapshot);
  const currentStep = useSelector(selectStep);
  const bookingSuccess = useSelector(selectBookingSuccess);

  if (!snapshot) {
    return <Navigate to="/booking/add" replace />;
  }

  return (
    <div className="booking-layout booking-panel flex h-full min-h-0 flex-col overflow-hidden rounded-2xl">
      <BookingHeader />

      {/* Main content area with sidebar */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">

        {/* Mobile / Tablet top summary */}
        {!bookingSuccess && (
          <motion.div
            className="border-b border-[var(--booking-border)] bg-[var(--booking-surface-muted)] px-3 pb-3 pt-3 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <LeftPanel compact />
          </motion.div>
        )}

        {/* Scrollable Content Area */}
        <div className="custom-scroll order-2 min-h-0 flex-1 overflow-y-auto bg-white p-3 sm:p-4 lg:order-1 lg:p-6">
          <AnimatePresence>
            <motion.div
              key={currentStep}
              className="min-h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <StepRenderer />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hide sidebar in Confirm Step */}
        {!bookingSuccess && (
          <motion.div
            className="order-2 hidden min-h-0 border-l border-[var(--booking-border)] bg-[var(--booking-surface-muted)] lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <LeftPanel />
          </motion.div>
        )}
      </div>

      {/* Footer - Always at bottom */}
      {!bookingSuccess && (<BookingFooter />)}
    </div>
  );
};
export default BookingLayout;
