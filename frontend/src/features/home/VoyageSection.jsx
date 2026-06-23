import scienceImg from "../../assets/images/science-stream.png";
import commerceImg from "../../assets/images/commerce-stream.png";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProgramsSection() {
  return (
    <section className="w-full py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">

        {/* HEADING */}
        <h2 className="text-left md:text-center text-[22px] md:text-[32px] font-semibold text-primary mb-6 md:mb-10">
          Our Academic Programs
        </h2>

        {/* CARDS */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">

          <ProgramCard
            image={scienceImg}
            title="Science Stream"
            desc="Strong foundation for NEET & JEE aspirants"
            path="/science"
          />

          <ProgramCard
            image={commerceImg}
            title="Commerce Stream"
            desc="Build your career in Business, Finance & CA"
            path="/commerce"
          />

        </div>

      </div>
    </section>
  );
}

function ProgramCard({ image, title, desc, path }) {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-[18px] overflow-hidden group cursor-pointer">

      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-full h-[180px] md:h-[360px] object-cover transition duration-500 group-hover:scale-105"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

        {/* TITLE */}
        <h3 className="text-white text-[18px] md:text-[26px] font-semibold">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-white/90 text-[12px] md:text-[14px] mt-1 max-w-[260px]">
          {desc}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate(path)}
          className="mt-3 flex items-center gap-2 bg-white text-[#0A2342] px-4 py-2 rounded-md text-[13px] font-medium hover:bg-gray-200 transition"
        >
          Explore
          <ArrowUpRight size={16} />
        </button>

      </div>
    </div>
  );
}