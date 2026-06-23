/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarDays, Globe, Mail, Phone, User } from "lucide-react";
import { updateGuest } from "../../../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import { selectGuestValidationVisible, selectSeatAssignments } from "../../../../../../../features/booking/availabilitySession/availabilitySelectors";
import { isValidIndianMobile, sanitizeMobileInput } from "../../../../../../../utils/validators/mobileValidation";

const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Other", value: "OTHER" },
];

const NATIONALITY_OPTIONS = [
  { label: "Indian", value: "IN" },
  { label: "Other", value: "OTHER" },
];

const labelClass = "mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#173d63] sm:text-xs sm:tracking-[0.16em]";

const inputBaseClass = "w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-[#071c3d] outline-none";

const getInputClass = (isInvalid) => `${inputBaseClass} ${
  isInvalid
    ? "border-red-500 focus:border-red-500"
    : "border-[#d1dbe7] focus:border-[#0f2d3a]"
}`;

const TravellerCard = ({ index, traveller }) => {
  const dispatch = useDispatch();
  const guestValidationVisible = useSelector(selectGuestValidationVisible);
  const seatAssignments = useSelector(selectSeatAssignments);
  const isPrimary = index === 0;
  const [touchedFields, setTouchedFields] = useState({});

  const name = traveller?.name || "";
  const email = traveller?.email || "";
  const phone = traveller?.phone || "";
  const dob = traveller?.dob || "";
  const gender = traveller?.gender || "";
  const nationality = traveller?.nationality || "";
  const assignedSeat = seatAssignments.find((item) => item.passengerIdx === index)?.seatId;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errors = {
    name: isPrimary && !name.trim(),
    email: isPrimary && (!email.trim() || !emailPattern.test(email.trim())),
    phone: isPrimary && !isValidIndianMobile(phone),
    dob: isPrimary && !dob,
    gender: isPrimary && !gender,
    nationality: isPrimary && !nationality,
  };

  const shouldShowError = (field) => Boolean(errors[field] && (guestValidationVisible || touchedFields[field]));

  const markTouched = (field) => {
    setTouchedFields((current) => (current[field] ? current : { ...current, [field]: true }));
  };

  const handleChange = (field, value) => {
    dispatch(updateGuest({ index, field, value }));
  };

  return (
    <div className="rounded-2xl border border-[#c8d5e3] bg-[#f8fafc] p-3.5">
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0f2d3a] text-xs font-semibold text-white">
            {index + 1}
          </div>
          <p className="text-base font-semibold tracking-tight text-[#071c3d]">
            {index === 0 ? "Primary Guest" : `Guest ${index + 1}`}
          </p>
        </div>

        {isPrimary ? (
          <span className={`text-xs font-bold tracking-wide ${guestValidationVisible ? "text-red-500" : "text-[#64748b]"}`}>
            {guestValidationVisible ? "REQUIRED" : "Required for booking"}
          </span>
        ) : null}
      </div>

      {assignedSeat ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7e0ea] bg-white px-3 py-1 text-xs font-medium text-[#0f2d3a]">
          Seat: {assignedSeat}
        </div>
      ) : null}

      <div className="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className={labelClass}><User size={14} /> FULL NAME *</label>
          <input
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => markTouched("name")}
            placeholder="Enter full name"
            className={getInputClass(shouldShowError("name"))}
          />
          {shouldShowError("name") ? <p className="mt-1 text-xs text-red-500">Full name is required</p> : null}
        </div>

        <div>
          <label className={labelClass}><Mail size={14} /> EMAIL *</label>
          <input
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => markTouched("email")}
            placeholder="email@example.com"
            className={getInputClass(shouldShowError("email"))}
          />
          {shouldShowError("email") ? <p className="mt-1 text-xs text-red-500">Enter a valid email</p> : null}
        </div>

        <div>
          <label className={labelClass}><Phone size={14} /> PHONE *</label>
          <input
            value={sanitizeMobileInput(phone)}
            inputMode="numeric"
            maxLength={10}
            onChange={(e) => handleChange("phone", sanitizeMobileInput(e.target.value))}
            onBlur={() => markTouched("phone")}
            placeholder="+91 XXXXX XXXXX"
            className={getInputClass(shouldShowError("phone"))}
          />
          {shouldShowError("phone") ? <p className="mt-1 text-xs text-red-500">Enter valid 10-digit Indian mobile</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        <div>
          <label className={labelClass}><CalendarDays size={14} /> DATE OF BIRTH *</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => handleChange("dob", e.target.value)}
            onBlur={() => markTouched("dob")}
            className={getInputClass(shouldShowError("dob"))}
          />
          {shouldShowError("dob") ? <p className="mt-1 text-xs text-red-500">Date of birth is required</p> : null}
        </div>

        <div>
          <label className={labelClass}>GENDER *</label>
          <select
            value={gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            onBlur={() => markTouched("gender")}
            className={getInputClass(shouldShowError("gender"))}
          >
            <option value="">Select</option>
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender.value} value={gender.value}>
                {gender.label}
              </option>
            ))}
          </select>
          {shouldShowError("gender") ? <p className="mt-1 text-xs text-red-500">Gender is required</p> : null}
        </div>

        <div>
          <label className={labelClass}><Globe size={14} /> NATIONALITY *</label>
          <select
            value={nationality || ""}
            onChange={(e) => handleChange("nationality", e.target.value)}
            onBlur={() => markTouched("nationality")}
            className={getInputClass(shouldShowError("nationality"))}
          >
            <option value="">Select</option>
            {NATIONALITY_OPTIONS.map((nationality) => (
              <option key={nationality.value} value={nationality.value}>
                {nationality.label}
              </option>
            ))}
          </select>
          {shouldShowError("nationality") ? <p className="mt-1 text-xs text-red-500">Nationality is required</p> : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TravellerCard);
