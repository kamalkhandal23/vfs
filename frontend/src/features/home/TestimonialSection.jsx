import avatar1 from "../../assets/icons/user1.png";
import avatar2 from "../../assets/icons/user2.png";
import avatar3 from "../../assets/icons/user3.png";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    avatar: avatar1,
    name: "Ramesh Sharma",
    role: "Parent",
    text: "Vrinda Foundation School has provided excellent academic support and personal attention to my child. The teachers are very supportive.",
  },
  {
    avatar: avatar2,
    name: "Pooja Verma",
    role: "Parent",
    text: "Best school in the area. The focus on discipline and studies is really impressive. My child has improved a lot.",
  },
  {
    avatar: avatar3,
    name: "Aman Singh",
    role: "Student",
    text: "The teaching style is very clear and helpful. I feel confident preparing for competitive exams like NEET and JEE.",
  },
  {
    avatar: avatar1,
    name: "Sunita Yadav",
    role: "Parent",
    text: "Safe environment, experienced faculty, and strong academic focus. Highly recommended for quality education.",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getIndex = (offset) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  return (
    <>
      {/* ================= MOBILE ================= */}
      <section className="w-full py-10 md:hidden">
        <div className="px-4">
          <h2 className="text-left text-[16px] font-semibold text-[#0A2342]">
            What Parents & Students Say
          </h2>

          <div className="mt-5 overflow-x-auto no-scrollbar">
            <div className="flex gap-4">
              {testimonials.map((item, i) => (
                <TestimonialCard
                  key={i}
                  {...item}
                  className="w-[280px] flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESKTOP ================= */}
      <section className="w-full py-16 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* HEADING */}
          <h2 className="text-center text-[26px] md:text-[32px] font-semibold text-primary mb-12">
            What Parents & Students Say
          </h2>

          {/* CAROUSEL */}
          <div className="flex items-center justify-center gap-6">

            <TestimonialCard {...testimonials[getIndex(-1)]} faded />
            <TestimonialCard {...testimonials[getIndex(0)]} active />
            <TestimonialCard {...testimonials[getIndex(1)]} faded />

          </div>

          {/* CONTROLS */}
          <div className="flex items-center justify-between mt-10">

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="h-10 w-10 flex items-center justify-center rounded-full border border-[#137DC5] text-white bg-[#0A2342]"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`h-[3px] w-6 rounded-full ${
                    i === currentIndex ? "bg-[#137DC5]" : "bg-[#D6DEE6]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  (prev + 1) % testimonials.length
                )
              }
              className="h-10 w-10 flex items-center justify-center rounded-full bg-[#0A2342] text-white"
            >
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </section>
    </>
  );
}

function TestimonialCard({
  avatar,
  name,
  role,
  text,
  active,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-[16px] p-6 transition-all duration-500
        ${active
          ? "bg-[#E6F1F7] scale-105 shadow-md"
          : "bg-[#EEF3F7] opacity-80"
        }
        ${className}
      `}
    >
      {/* STARS */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
        ))}
      </div>

      {/* TEXT */}
      <p className="text-[13px] text-secondary leading-[1.6] line-clamp-3">
        {text}
      </p>

      {/* USER */}
      <div className="flex items-center gap-3 mt-5">
        <img
          src={avatar}
          alt={name}
          className="h-9 w-9 rounded-full object-cover"
        />

        <div>
          <p className="text-[13px] font-semibold text-primary">{name}</p>
          <p className="text-[12px] text-secondary">{role}</p>
        </div>
      </div>
    </div>
  );
}