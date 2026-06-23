import { useMemo, useState } from "react";
import scienceImg from "../../assets/images/vfs-hero-section/vfs3.jpg";
import commerceImg from "../../assets/images/vfs-hero-section/vfs3.jpg";

export default function ProgramsHeroSection() {

  const [activeTab, setActiveTab] = useState("science");

  const PROGRAMS = useMemo(() => ({
    science: {
      image: scienceImg,
      title: "Science Stream",
      desc: "Strong foundation for NEET, JEE and future technical careers.",
    },
    commerce: {
      image: commerceImg,
      title: "Commerce Stream",
      desc: "Build your career in business, finance, CA and management.",
    },
  }), []);

  const current = PROGRAMS[activeTab];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="relative w-full h-[520px] md:h-[560px]">

      {/* BACKGROUND IMAGE */}
      <img
        src={current.image}
        alt={current.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">

        <h1 className="text-[28px] md:text-[44px] font-semibold">
          {current.title}
        </h1>

        <p className="mt-3 text-[14px] md:text-[16px] text-white/90 max-w-[500px]">
          {current.desc}
        </p>

      </div>

      {/* TABS */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-20">

        <div className="flex w-[280px] md:w-[360px] rounded-full bg-white shadow-lg">

          <button
            onClick={() => handleTabChange("science")}
            className={`w-1/2 py-3 text-sm font-semibold rounded-full transition ${
              activeTab === "science"
                ? "bg-[#0A2342] text-white"
                : "text-[#0A2342]"
            }`}
          >
            Science
          </button>

          <button
            onClick={() => handleTabChange("commerce")}
            className={`w-1/2 py-3 text-sm font-semibold rounded-full transition ${
              activeTab === "commerce"
                ? "bg-[#0A2342] text-white"
                : "text-[#0A2342]"
            }`}
          >
            Commerce
          </button>

        </div>

      </div>
    </section>
  );
}