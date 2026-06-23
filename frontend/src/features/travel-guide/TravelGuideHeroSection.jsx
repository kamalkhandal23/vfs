import { useMemo, useState } from "react";
import { Ship } from "lucide-react";
import travel from "../../assets/images/travel-guide-hero.png";
import travelbottomwave from "../../assets/styles/travel-bottom-wave.png";
export default function TravelGuideHeroSection() {
  const ROUTES = useMemo(
    () => [
      { key: "mandwa-terminal", label: "Mandwa Terminal" },
      { key: "ferry-wharf-terminal", label: "Ferry Wharf Terminal" },
      { key: "vijaydurg-port-terminal", label: "Vijaydurg Port Terminal" },
    ],
    []
  );

  const handleRouteClick = (key) => {
    setActiveRoute(key);

    const section = document.getElementById(key);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const [activeRoute, setActiveRoute] = useState("mandwa-terminal");

  return (
    <>
      <section className="w-full">
        {/* HERO IMAGE */}
        <div className="relative w-full h-[460px] md:h-[520px] overflow-visible">
          <img
            src={travel}
            alt="Travel"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-[70px] left-1/2 -translate-x-1/2 md:left-[50px] md:translate-x-0">
            <h1 className="text-[35px] md:text-[72px] font-semibold text-white">
              Travel Guide
            </h1>
          </div>

          {/* Bottom segmented route bar */}
          <div className="absolute left-0 right-0 bottom-[20px] z-30 px-3 md:bottom-[-30px] md:px-10">
            <div className="mx-auto w-full max-w-[1080px]">
              <div className="relative">
                <div className="flex w-full overflow-hidden rounded-[10px] bg-[#0A2342] shadow-[0_25px_50px_rgba(0,0,0,0.35)]">
                  {ROUTES.map((r) => {
                    const active = activeRoute === r.key;
                    return (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => handleRouteClick(r.key)}
                        className={`flex-1 cursor-pointer select-none px-2 py-2 md:px-4 md:py-3 text-[9px] md:text-[13px] font-semibold transition-all duration-300 ease-out ${active
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
            src={travelbottomwave}
            alt=""
            className="block w-full h-auto"
          />
        </div>
      </section>
    </>
  );
}