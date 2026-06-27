import fleetBg from "../../assets/images/vfs-hero-section/vfs3.jpg";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  School,
  Sparkles,
  Users,
} from "lucide-react";

const HIGHLIGHTS = [
  { label: "Since 2009", icon: Award },
  { label: "English Medium School", icon: BookOpen },
  { label: "Play Nursery to Class 12", icon: School },
];

const QUICK_STATS = [
  { value: "1200+", label: "Students Guided", icon: Users },
  { value: "15+", label: "Years of Excellence", icon: Award },
  { value: "100%", label: "Focus on Growth", icon: Sparkles },
];

export default function AboutHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#0A2342]">

      {/* BACKGROUND IMAGE */}
      <img
        src={fleetBg}
        alt="Vrinda Foundation School"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#081A33]/92 via-[#081A33]/78 to-[#0F4C81]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,207,200,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_30%)]" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-[1280px] items-center px-5 py-20 md:px-6 md:py-24">
        <div className="grid w-full gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-center">
          <div className="max-w-[720px] text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-sm">
              <Sparkles size={14} />
              About Us
            </div>

            <h1 className="mt-5 text-[34px] font-semibold leading-[1.08] text-white md:text-[58px]">
              About Vrinda Foundation School
            </h1>

            <p className="mt-5 max-w-[650px] text-[15px] leading-[1.8] text-white/88 md:text-[17px]">
              Rooted in Indian values and focused on holistic development, Vrinda
              Foundation School provides a nurturing environment where every child
              grows with confidence, discipline, and a strong academic foundation.
            </p>

            <p className="mt-4 max-w-[640px] text-[14px] leading-[1.8] text-white/74 md:text-[15px]">
              From Play Nursery to Class 12, we emphasize English communication,
              modern teaching methods, and concept-based learning supported by
              experienced faculty and audio-visual classrooms.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[12px] font-medium text-white/92 backdrop-blur-sm"
                  >
                    <Icon size={14} />
                    {item.label}
                  </span>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={() => navigate("/admissions")}
                className="inline-flex items-center gap-2 rounded-full bg-[#00CFC8] px-7 py-3.5 text-[15px] font-semibold text-[#0A2342] shadow-[0_12px_28px_rgba(0,207,200,0.28)] transition hover:scale-[1.03]"
              >
                Apply Now
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/about")}
                className="rounded-full border border-white/55 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white hover:text-[#0A2342]"
              >
                Learn More
              </button>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
