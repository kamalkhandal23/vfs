import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import school1 from "../../assets/images/vfs-hero-section/vfs1.jpg";
import school2 from "../../assets/images/vfs-hero-section/vfs2.jpg";
import school3 from "../../assets/images/vfs-hero-section/vfs3.jpg";

const swiperModules = [Autoplay];

export default function SchoolExploreSection() {
  const slides = [
    {
      img: school1,
      title: "Smart Classrooms",
      desc: "Modern digital classrooms for interactive learning experience.",
    },
    {
      img: school2,
      title: "Sports & Activities",
      desc: "Encouraging physical fitness and overall development.",
    },
    {
      img: school3,
      title: "Science & Computer Labs",
      desc: "Well-equipped labs for practical and technical learning.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);

  const nextSlide = () => swiperRef.current?.slideNext();
  const prevSlide = () => swiperRef.current?.slidePrev();
  const goToSlide = (index) => swiperRef.current?.slideToLoop(index);

  return (
    <section className="w-full py-10 md:py-16 bg-[#F4F8FB]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* HEADING */}
        <div className="text-left md:text-center mb-6 md:mb-10">
          <h2 className="text-[22px] font-bold text-[#0A2342] md:text-[32px]">
            Explore Life at Vrinda Foundation School
          </h2>
          <p className="mt-2 text-sm text-gray-600 md:text-[15px]">
            Discover our campus, facilities, and student activities
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative overflow-hidden rounded-[20px] shadow-md">

          <Swiper
            modules={swiperModules}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative">
                  
                  {/* IMAGE */}
                  <img
                    src={slide.img}
                    alt=""
                    className="w-full h-[240px] md:h-[480px] object-cover"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/40"></div>

                  {/* TEXT CONTENT */}
                  <div className="absolute bottom-6 left-4 md:left-10 text-white max-w-[500px]">
                    <h3 className="text-lg md:text-2xl font-semibold">
                      {slide.title}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-white/90">
                      {slide.desc}
                    </p>

                    {/* CTA */}
                    <button className="mt-3 bg-primary px-4 py-2 text-xs md:text-sm rounded-md font-medium hover:bg-primary-dark transition">
                      Learn More
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CONTROLS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow-lg">

            {/* LEFT */}
            <button
              onClick={prevSlide}
              className="h-6 w-6 flex items-center justify-center rounded-md bg-white shadow"
            >
              <ChevronLeft size={18} />
            </button>

            {/* DOTS */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-2.5 w-2.5 rounded-full cursor-pointer transition ${
                    current === i ? "bg-[#00AEEF] scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* RIGHT */}
            <button
              onClick={nextSlide}
              className="h-6 w-6 flex items-center justify-center rounded-md bg-white shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}