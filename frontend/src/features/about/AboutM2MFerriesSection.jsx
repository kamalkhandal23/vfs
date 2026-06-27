import { useEffect, useState } from "react";
import img1 from "../../assets/images/vfs-hero-section/vfs1.jpg";
import img2 from "../../assets/images/vfs-hero-section/vfs2.jpg";
import img3 from "../../assets/images/vfs-hero-section/vfs3.jpg";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SLIDES = [
  {
    src: img1,
    alt: "M2M passengers",
  },
  {
    src: img2,
    alt: "M2M vessel",
  },
  {
    src: img3,
    alt: "M2M ferry interior",
  },
];

const SLOT_STYLES = {
  mobile: {
    left: {
      width: "4.25rem",
      height: "7.25rem",
      translateX: "-7.9rem",
      translateY: "2.25rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
    center: {
      width: "11.5rem",
      height: "10.5rem",
      translateX: "0rem",
      translateY: "0rem",
      scale: 1,
      opacity: 1,
      borderRadius: "1rem",
      boxShadow: "0 18px 40px rgba(10,35,66,0.16)",
      zIndex: 20,
    },
    right: {
      width: "4.25rem",
      height: "7.25rem",
      translateX: "7.9rem",
      translateY: "2.25rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
  },
  sm: {
    left: {
      width: "6.875rem",
      height: "10rem",
      translateX: "-11.9375rem",
      translateY: "2.25rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
    center: {
      width: "15rem",
      height: "13.125rem",
      translateX: "0rem",
      translateY: "0rem",
      scale: 1,
      opacity: 1,
      borderRadius: "1rem",
      boxShadow: "0 18px 40px rgba(10,35,66,0.16)",
      zIndex: 20,
    },
    right: {
      width: "6.875rem",
      height: "10rem",
      translateX: "11.9375rem",
      translateY: "2.25rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
  },
  md: {
    left: {
      width: "4.5rem",
      height: "7.375rem",
      translateX: "-7.875rem",
      translateY: "2rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
    center: {
      width: "10rem",
      height: "11.875rem",
      translateX: "0rem",
      translateY: "0rem",
      scale: 1,
      opacity: 1,
      borderRadius: "1rem",
      boxShadow: "0 18px 40px rgba(10,35,66,0.16)",
      zIndex: 20,
    },
    right: {
      width: "4.5rem",
      height: "7.375rem",
      translateX: "7.875rem",
      translateY: "2rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
  },
  lg: {
    left: {
      width: "7.5rem",
      height: "11.25rem",
      translateX: "-14.125rem",
      translateY: "2.5rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
    center: {
      width: "18.75rem",
      height: "16.25rem",
      translateX: "0rem",
      translateY: "0rem",
      scale: 1,
      opacity: 1,
      borderRadius: "1rem",
      boxShadow: "0 18px 40px rgba(10,35,66,0.16)",
      zIndex: 20,
    },
    right: {
      width: "7.5rem",
      height: "11.25rem",
      translateX: "14.125rem",
      translateY: "2.5rem",
      scale: 0.9,
      opacity: 0.8,
      borderRadius: "0.875rem",
      boxShadow: "0 8px 24px rgba(10,35,66,0.08)",
      zIndex: 10,
    },
  },
};

function getImageSlot(imageIndex, activeIndex, totalImages) {
  const relativeIndex = (imageIndex - activeIndex + totalImages) % totalImages;

  if (relativeIndex === 0) return "left";
  if (relativeIndex === 1) return "center";
  return "right";
}

function getViewportKey() {
  if (typeof window === "undefined") {
    return "lg";
  }

  if (window.innerWidth >= 1024) return "lg";
  if (window.innerWidth >= 768) return "md";
  if (window.innerWidth >= 640) return "sm";
  return "mobile";
}

export default function AboutM2MFerriesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportKey, setViewportKey] = useState(getViewportKey);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % SLIDES.length);
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportKey(getViewportKey());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-[linear-gradient(180deg,#94D4FF47_0%,#94D4FF47_72%,#EAF8FF_100%)] px-4 py-10 md:px-6 md:py-14 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-left text-[30px] font-semibold leading-tight text-[#0A2342] md:text-center md:text-[44px]">
          About Vrinda Foundation School
        </h2>

        <div className="mt-8 grid items-start gap-5 md:mt-10 md:grid-cols-2 md:max-lg:grid-cols-[320px_minmax(0,1fr)] md:max-lg:gap-6 lg:gap-10">
          <div className="mx-auto w-full max-w-[22rem] min-[360px]:max-w-[24rem] md:mx-0 md:max-lg:w-[320px] md:max-lg:max-w-full lg:max-w-[34rem]">
            <div className="relative h-[10.75rem] min-[360px]:h-[11.5rem] sm:h-[13.5rem] md:h-[12rem] lg:h-[16.5rem]">
              {SLIDES.map((slide, index) => {
                const slot = getImageSlot(index, activeIndex, SLIDES.length);
                const slotStyle = SLOT_STYLES[viewportKey][slot];

                return (
                  <CarouselImage
                    key={`${slide.alt}-${index}`}
                    slide={slide}
                    slotStyle={slotStyle}
                  />
                );
              })}
            </div>
          </div>

          <div className="min-w-0 text-left">
            <h3 className="text-[22px] font-semibold leading-tight text-[#0A2342] md:text-[28px]">
              How We Teach at Vrinda Foundation School
            </h3>

            <p className="mt-4 max-w-[38rem] text-[14px] leading-[1.8] text-slate-600 md:text-[16px]">
              We focus on building strong concepts, communication skills, and
              confidence in every student through modern and engaging teaching
              methods.
            </p>

            <p className="mt-4 max-w-[38rem] text-[14px] leading-[1.8] text-slate-600 md:text-[16px]">
              Concept-based learning, English communication focus, preparation for
              NEET and JEE, and interactive activity-based classes help students
              stay engaged and confident.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[#0A2342]">
              {[
                "Concept-Based Learning",
                "English Communication Focus",
                "Preparation for NEET, JEE & Competitive Exams",
                "Interactive & Activity-Based Classes",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#00CFC8]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* <button
              onClick={() => navigate("/academics")}
              className="mt-6 rounded-md bg-primary-dark px-5 py-2 text-[14px] font-semibold text-white transition hover:scale-105"
            >
              Explore Academics
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselImage({ slide, slotStyle }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="absolute left-1/2 top-0 overflow-hidden transition-all duration-700 ease-in-out will-change-transform"
      style={{
        width: slotStyle.width,
        height: slotStyle.height,
        opacity: slotStyle.opacity,
        borderRadius: slotStyle.borderRadius,
        boxShadow: slotStyle.boxShadow,
        zIndex: slotStyle.zIndex,
        transform:
          `translate3d(calc(-50% + ${slotStyle.translateX}), ${slotStyle.translateY}, 0) scale(${slotStyle.scale})`,
        transformOrigin: "center center",
        backfaceVisibility: "hidden",
      }}
    >
      
      <img
        src={slide.src}
        alt={slide.alt}
        loading="eager"
        decoding="async"
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
}
