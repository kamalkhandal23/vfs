import React from "react";
import { Phone, Mail, Users } from "lucide-react";

const BulkBookingCard = ({ isCompact = false }) => {
  return (
    <div className="booking-card overflow-hidden rounded-2xl bg-gradient-to-br from-[#f8fbfd] via-white to-[var(--booking-secondary)] p-5">

      {/* Header */}
      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--booking-primary)] shadow-sm">
          <Users size={18} className="text-white" />
        </div>

        <div>
          <h4 className="text-[13px] font-semibold text-[#0f172a] sm:text-[14px]">
            Bulk Booking
          </h4>

          <p className="text-[10px] text-[#475569] mt-[2px] sm:text-[11px]">
            Groups of 10+ passengers
          </p>
        </div>

      </div>

      {/* Description */}
      {!isCompact && <p className="mt-4 text-[11px] leading-relaxed text-[#334155] sm:text-[12px]">
        Planning a group trip? Get special rates and dedicated support for
        bulk bookings. Reach out to us directly!
      </p>}

      {/* Buttons */}
      <div className="mt-5 flex gap-3">

        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--booking-primary)] py-2.5 text-[12px] font-medium text-white transition hover:opacity-90 sm:text-[13px]">
          <Phone size={16}  />
          Call Us
        </button>

        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--booking-primary)] bg-white py-2.5 text-[12px] font-medium text-[var(--booking-primary)] transition hover:bg-[var(--booking-surface-muted)] sm:text-[13px]">
          <Mail size={16} />
          Email
        </button>

      </div>

    </div>
  );
};

export default BulkBookingCard;
