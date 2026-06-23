import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "swiper/css";

import { heroSlides } from "../../data/heroSlides";
import SliderDots from "../../components/common/SliderDots";

const swiperModules = [Autoplay];

export default function HeroSection({ slides = heroSlides }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const totalSlides = slides?.length || 0;
  const safeIndex =
    totalSlides > 0 ? Math.min(activeSlide, totalSlides - 1) : 0;

  const handleDotClick = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <section className="relative overflow-hidden bg-white md:h-[810px]">
      <style>
        {`
          @keyframes sloganUnderlineGrow {
            0% {
              transform: scaleX(0);
              opacity: 0.7;
            }
            100% {
              transform: scaleX(1);
              opacity: 1;
            }
          }

          .hero-slogan-underline {
            animation: sloganUnderlineGrow 1.2s ease-out forwards;
            transform-origin: left center;
          }
        `}
      </style>

      {/* ================= SLIDER ================= */}
      <Swiper
        modules={swiperModules}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[460px] w-full md:h-[810px]">

              {/* IMAGE */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= DESKTOP CONTENT ================= */}
      <div className="absolute inset-0 z-10 hidden md:flex items-end">
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-[100px] text-white">

          <div className="max-w-[750px]">

            {/* HEADING */}
            <h2 className="relative inline-block text-[32px] font-medium leading-[1.2] text-white lg:text-[42px]">
              <span className="block">No Child Left Behind</span>
              <span className="hero-slogan-underline absolute left-0 top-full mt-2 h-[4px] w-full rounded-full bg-[#00CFC8]" />
            </h2>

            <h1 className="mt-2 whitespace-nowrap text-[42px] lg:text-[58px] xl:text-[64px] font-semibold leading-[1.1]">
              Vrinda Foundation School
            </h1>

            {/* SUBTEXT */}
            <p className="mt-4 text-[15px] text-white/90 leading-[1.6]">
              Building strong academic foundation for students from Class 6–10 with early preparation for NEET, JEE, CLAT & NDA.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-6 flex items-center gap-4">

              {/* NEEV BUTTON */}
              <button
                onClick={() => navigate("/neev")}
                className="flex items-center gap-2 rounded-full bg-[#00CFC8] px-6 py-3 text-[#0A2342] font-semibold shadow-lg transition hover:scale-105"
              >
                नींव – Pre Foundation
                <ArrowUpRight size={18} />
              </button>

              {/* APPLY NOW */}
              <button
                onClick={() => navigate("/admissions")}
                className="border border-white px-5 py-3 rounded-full text-white font-medium hover:bg-white hover:text-[#0A2342] transition"
              >
                Apply Now
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* ================= DESKTOP DOTS ================= */}
      <div className="absolute bottom-[-1px] left-1/2 z-20 hidden -translate-x-1/2 md:block">
        <div className="relative h-[66px] w-[360px]">

          <svg
            viewBox="0 0 360 66"
            className="absolute inset-x-0 bottom-[-1px] h-[calc(100%+2px)] w-full"
          >
            <path
              d="M0 66 C40 66 48 36 80 36 L280 36 C312 36 320 66 360 66 Z"
              fill="#E6F7FF"
            />
          </svg>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer">
            <SliderDots
              total={totalSlides}
              activeIndex={safeIndex}
              onSelect={handleDotClick}
            />
          </div>

        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="absolute inset-0 z-10 md:hidden flex flex-col items-center justify-center text-center px-4 text-white">

        <h2 className="relative inline-block text-[26px] font-medium leading-[1.3] text-white">
          <span className="block">No Child Left Behind</span>
          <span className="hero-slogan-underline absolute left-0 top-full mt-2 h-[3px] w-full rounded-full bg-[#00CFC8]" />
        </h2>

        <p className="mt-3 text-[13px] text-white/90">
          Strong foundation for NEET, JEE & future success
        </p>

        {/* MOBILE CTA */}
        <button
          onClick={() => navigate("/neev")}
          className="mt-5 flex items-center gap-2 rounded-full bg-[#00CFC8] px-5 py-2 text-[14px] font-semibold text-[#0A2342] shadow-md"
        >
          नींव Batch
          <span className="bg-[#137DC5] text-white rounded-full h-7 w-7 flex items-center justify-center">
            ↗
          </span>
        </button>

      </div>
    </section>
  );
}
