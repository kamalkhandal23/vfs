import { Phone } from "lucide-react";

export default function ContactCTASection() {
  return (
    <section className="px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-[1100px]">

        {/* CONTAINER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-[16px] bg-gradient-to-r from-[#0A2342] to-[#137DC5] px-6 py-8 md:px-10 md:py-10">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left max-w-[520px]">

            <h3 className="text-[20px] md:text-[26px] font-semibold text-white leading-[1.4]">
              Admissions Open for 2026-27
            </h3>

            <p className="mt-2 text-sm md:text-[15px] text-white/90">
              Give your child the best education with strong academic foundation and disciplined environment.
            </p>

            {/* PHONE */}
            <p className="mt-3 text-[15px] md:text-[18px] font-semibold text-white">
              📞 +91 9001700414
            </p>

          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3">

            {/* CALL BUTTON */}
            <a
              href="tel:9001700414"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[#0A2342] font-semibold hover:scale-105 transition"
            >
              <Phone size={16} />
              Call Now
            </a>

            {/* APPLY BUTTON */}
            <button
              onClick={() => (window.location.href = "/admissions")}
              className="rounded-full border border-white px-6 py-3 text-white font-medium hover:bg-white hover:text-[#0A2342] transition"
            >
              Apply Now
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}