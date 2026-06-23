import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTermsAccepted } from "../../../../../../../features/booking/availabilitySession/availabilitySelectors";
import { toggleTerms } from "../../../../../../../features/booking/availabilitySession/availabilitySessionSlice";


const TermsAgreement = () => {

  const dispatch = useDispatch();
  const accepted = useSelector(selectTermsAccepted);

  return (
    <div className="rounded-xl border border-[#c8d5e3] p-3.5 sm:p-4 flex items-center gap-3 bg-white">

      <input
        type="checkbox"
        checked={accepted}
        onChange={(e) => dispatch(toggleTerms(e.target.checked))}
        className="h-4 w-4 rounded border-gray-300 text-[#1b6983] accent-[#1b6983]"
      />

      <div>

        <p className="font-medium text-xs sm:text-sm">
          I accept the Terms & Conditions
        </p>

        <p className="text-[11px] text-gray-500 sm:text-xs">
          By proceeding, I agree to M2M Ferries’ cancellation policy,
          boarding rules, and terms of service.
        </p>

      </div>

    </div>
  );
};

export default TermsAgreement;
