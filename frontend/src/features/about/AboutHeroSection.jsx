import fleetBg from "../../assets/images/vfs-hero-section/vfs3.jpg";
import { useNavigate } from "react-router-dom";

export default function AboutHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[520px] md:h-[560px] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={fleetBg}
        alt="Vrinda Foundation School"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center md:justify-start px-5 md:px-6 md:pl-[10%]">

        <div className="max-w-[700px] text-center md:text-left">

          {/* HEADING */}
          <h1 className="text-[28px] md:text-[40px] font-semibold text-white leading-[1.2]">
            About Vrinda Foundation School
          </h1>

          {/* SUBTEXT */}
          <p className="mt-4 text-[14px] md:text-[16px] text-white/90 leading-[1.6]">
            Rooted in Indian values and focused on holistic development, Vrinda Foundation School provides a nurturing environment where every child grows with confidence, discipline, and strong academic foundation.
          </p>

          {/* DESCRIPTION */}
          <p className="mt-3 text-[13px] md:text-[14px] text-white/80 leading-[1.6]">
            From Play Nursery to Class 12, we emphasize English communication, modern teaching methods, and concept-based learning supported by experienced faculty and audio-visual classrooms.
          </p>

          {/* HIGHLIGHTS */}
          <div className="mt-5 flex flex-wrap gap-3 text-[12px] md:text-[13px] text-white/90">

            <span className="bg-white/10 px-3 py-1 rounded-full">
              Since 2009
            </span>

            <span className="bg-white/10 px-3 py-1 rounded-full">
              English Medium School
            </span>

            <span className="bg-white/10 px-3 py-1 rounded-full">
              Play Nursery to Class 12
            </span>

          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center md:justify-start">

            <button
              onClick={() => navigate("/admissions")}
              className="bg-[#00CFC8] text-[#0A2342] px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              Apply Now
            </button>

            <button
              onClick={() => navigate("/about")}
              className="border border-white px-6 py-3 rounded-full text-white font-medium hover:bg-white hover:text-[#0A2342] transition"
            >
              Learn More
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}