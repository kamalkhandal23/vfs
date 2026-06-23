import { useEffect, useState } from "react";
import img1 from "../../assets/images/vfs-hero-section/vfs1.jpg";
import img2 from "../../assets/images/vfs-hero-section/vfs2.jpg";
import img3 from "../../assets/images/vfs-hero-section/vfs3.jpg";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SLIDES = [
  { src: img1, alt: "Classroom teaching" },
  { src: img2, alt: "Interactive learning" },
  { src: img3, alt: "Student engagement" },
];

export default function TeachingApproachSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#F4F8FB] px-4 py-10 md:px-6 md:py-16">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGES */}
        <div className="flex items-end justify-center gap-3 md:justify-start">
          <img
            src={SLIDES[activeIndex % 3].src}
            className="h-[140px] w-[90px] md:h-[180px] md:w-[120px] rounded-lg object-cover"
          />
          <img
            src={SLIDES[(activeIndex + 1) % 3].src}
            className="h-[200px] w-[220px] md:h-[260px] md:w-[300px] rounded-xl shadow-md object-cover"
          />
          <img
            src={SLIDES[(activeIndex + 2) % 3].src}
            className="h-[140px] w-[90px] md:h-[180px] md:w-[120px] rounded-lg object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-[24px] md:text-[36px] font-semibold text-[#0A2342]">
            How We Teach at Vrinda Foundation School
          </h2>

          <p className="mt-3 text-sm md:text-[15px] text-gray-600 leading-[1.6]">
            We focus on building strong concepts, communication skills, and confidence in every student through modern and engaging teaching methods.
          </p>

          {/* POINTS */}
          <div className="mt-6 space-y-3 text-sm">

            {[
              "Concept-Based Learning",
              "English Communication Focus",
              "Preparation for NEET, JEE & Competitive Exams",
              "Interactive & Activity-Based Classes",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-[#00CFC8]" />
                {item}
              </div>
            ))}

          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/academics")}
            className="mt-6 bg-[#00CFC8] text-[#0A2342] px-5 py-2 rounded-md font-semibold hover:scale-105 transition"
          >
            Explore Academics
          </button>

        </div>
      </div>
    </section>
  );
}