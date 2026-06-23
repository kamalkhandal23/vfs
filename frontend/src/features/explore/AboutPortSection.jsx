import { useEffect, useState } from "react";
import exploreBgWave from "../../assets/styles/explore-bg-wave.png";

// Mandwa images
import mandwa1 from "../../assets/images/explore-card-1.png";
import mandwa2 from "../../assets/images/explore-card-2.png";
import mandwa3 from "../../assets/images/explore-card-3.png";

// Mumbai images
import mumbai1 from "../../assets/images/sitting-main-1.png";
import mumbai2 from "../../assets/images/sitting2.png";
import mumbai3 from "../../assets/images/sitting3.png";

// Vijaydurg images
import vijay1 from "../../assets/images/voyage1.jpg";
import vijay2 from "../../assets/images/voyage2.jpg";
import vijay3 from "../../assets/images/voyage3.jpg";

export default function AboutPortSection({ activeRoute }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const DATA = {
    mandwa: {
      title: "About Mandwa Port",
      desc1:
        "The only world class Roll-On-Roll-Off-Passenger (Ro-Pax for short) Ferry service in the country. Our service cuts travel time drastically and provides all-weather connectivity.",
      desc2:
        "We operate a modern, efficient and comfortable service between these key locations in Maharashtra with world-class facilities.",
      images: [mandwa1, mandwa2, mandwa3],
    },
    mumbai: {
      title: "About Mumbai Port",
      desc1:
        "Mumbai port is one of the busiest ports in India and serves as a major maritime hub connecting key passenger and cargo routes.",
      desc2:
        "It plays a crucial role in ferry operations and connects Mumbai with Mandwa through high-speed Ro-Pax services.",
      images: [mumbai1, mumbai2, mumbai3],
    },
    vijaydurg: {
      title: "About Vijaydurg Port",
      desc1:
        "Vijaydurg is a historic port located in the Konkan region, known for its strategic importance and scenic coastline.",
      desc2:
        "It supports ferry connectivity and is emerging as an important travel and tourism destination.",
      images: [vijay1, vijay2, vijay3],
    },
  };

  // ✅ SAFETY (never crash)
  const current = DATA[activeRoute] || DATA["mandwa"];

  useEffect(() => {
    setActiveIndex(0);
  }, [activeRoute]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % current.images.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [current]);

  return (
    <section className="relative w-full overflow-hidden">
      
      {/* 🔵 TOP WAVE */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[170px] md:h-[230px] z-0">
        <img
          src={exploreBgWave}
          alt=""
          className="w-full h-[1100px] object-contain object-top"
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-[120px] pb-16 md:pt-[150px] md:pb-20">

        <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-start">

          {/* ================= LEFT IMAGES ================= */}
          <div className="flex items-end gap-4 justify-center md:justify-start">

            {/* LEFT SMALL */}
            <img
              key={`left-${current.title}-${activeIndex}`}
              src={current.images[activeIndex % current.images.length]}
              alt=""
              className="w-[90px] h-[140px] sm:w-[110px] sm:h-[160px] md:w-[120px] md:h-[180px] object-cover rounded-r-[14px] -translate-y-[16px] sm:-translate-y-[18px] md:-translate-y-[20px] transition-all duration-500"
            />

            {/* CENTER BIG */}
            <img
              key={`center-${current.title}-${(activeIndex + 1) % current.images.length}`}
              src={current.images[(activeIndex + 1) % current.images.length]}
              alt=""
              className="w-[210px] h-[180px] sm:w-[240px] sm:h-[210px] md:w-[300px] md:h-[260px] object-cover rounded-[16px] shadow-md transition-all duration-500"
            />

            {/* RIGHT SMALL */}
            <img
              key={`right-${current.title}-${(activeIndex + 2) % current.images.length}`}
              src={current.images[(activeIndex + 2) % current.images.length]}
              alt=""
              className="w-[90px] h-[140px] sm:w-[110px] sm:h-[160px] md:w-[120px] md:h-[180px] object-cover rounded-l-[14px] -translate-y-[16px] sm:-translate-y-[18px] md:-translate-y-[20px] transition-all duration-500"
            />

          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="text-center md:text-left">

            <h2 className="text-[18px] sm:text-[20px] md:text-[24px] font-semibold text-primary transition-all duration-300">
              {current.title}
            </h2>

            <p className="mt-4 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-secondary transition-all duration-300">
              {current.desc1}
            </p>

            <p className="mt-4 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-secondary transition-all duration-300">
              {current.desc2}
            </p>

            {/* BUTTON */}
            <button className="mt-5 px-5 py-3 rounded-[10px] bg-primary-dark text-white text-[13px] sm:text-[14px] font-medium hover:opacity-90 transition">
              LEARN MORE
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
