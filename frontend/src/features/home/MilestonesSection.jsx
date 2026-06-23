import { useEffect, useRef, useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import {
  Users,
  GraduationCap,
  BookOpen,
  Award,
} from "lucide-react";

const COUNTER_DURATION = 2500;

const STATS = [
  {
    icon: Users,
    value: 1200,
    suffix: "+",
    label: "Students Enrolled",
  },
  {
    icon: GraduationCap,
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
  },
  {
    icon: BookOpen,
    value: 100,
    suffix: "%",
    label: "Board Result Success",
  },
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Top Achievements",
  },
];

export default function SchoolStatsSection() {
  return (
    <section className="bg-[#F4F8FB] py-14 md:py-20">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        {/* HEADING */}
        <h2 className="text-center text-[24px] md:text-[32px] font-semibold text-[#0A2342]">
          Our Achievements
        </h2>

        <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
          Building trust through consistent academic excellence
        </p>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">

          {STATS.map((item, index) => (
            <StatCard key={index} {...item} />
          ))}

        </div>

      </div>
    </section>
  );
}


/* ================= CARD ================= */

function StatCard({ icon: Icon, value, suffix, label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCounter(value, COUNTER_DURATION, visible);

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition"
    >
      {/* ICON */}
      <div className="flex justify-center mb-3">
        <div className="bg-[#E6F2FF] p-3 rounded-full">
          <Icon size={22} className="text-[#137DC5]" />
        </div>
      </div>

      {/* COUNT */}
      <p className="text-[22px] md:text-[26px] font-bold text-[#0A2342]">
        {count}
        {suffix}
      </p>

      {/* LABEL */}
      <p className="text-[12px] md:text-[14px] text-gray-600 mt-1">
        {label}
      </p>
    </div>
  );
}