import { useMemo, useState } from "react";
import { Ship } from "lucide-react";
import AboutPortSection from "./AboutPortSection";
import exploreHeroWave from "../../assets/styles/explore-hero-wave-white.png";
import explore1 from "../../assets/images/explore1.jpg";

export default function ExploreSection() {
  const ROUTES = useMemo(
    () => [
      { key: "mandwa", label: "Mandwa" },
      { key: "mumbai", label: "Mumbai" },
      { key: "vijaydurg", label: "Vijaydurg" },
    ],
    []
  );
  const [activeRoute, setActiveRoute] = useState("mandwa");

  return (
    <>
      <section className="w-full bg-[linear-gradient(180deg,#F5FFFF_0%,#94D4FF47_20%,#94D4FF47_100%)]">
        {/* HERO IMAGE */}
        <div className="relative w-full h-[360px] md:h-[520px] overflow-visible">
          <img
            src={explore1}
            alt="Explore"
            className="w-full h-full object-cover"
          />

          {/* Bottom segmented route bar */}
          <div className="absolute left-0 right-0 bottom-[-30px] z-30 px-4 md:px-10">
            <div className="mx-auto w-full max-w-[1080px]">
              <div className="relative">
                <div className="flex w-full overflow-hidden rounded-[10px] bg-[#0A2342] shadow-[0_25px_50px_rgba(0,0,0,0.35)]">
                  {ROUTES.map((r) => {
                    const active = activeRoute === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setActiveRoute(r.key)}
                        className={`flex-1 cursor-pointer select-none px-4 py-3 text-[12px] md:text-[13px] font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.99] ${
                          active
                            ? "bg-white text-[#0A2342]"
                            : "text-white/90 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span className="inline-flex items-center justify-center gap-2">
                          <Ship size={14} strokeWidth={2.2} />
                          {r.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full -mt-[1px] z-0">
          <img
            src={exploreHeroWave}
            alt=""
            className="block w-full h-auto"
          />
        </div>
      </section>
      <AboutPortSection activeRoute={activeRoute} />
    </>
  );
}