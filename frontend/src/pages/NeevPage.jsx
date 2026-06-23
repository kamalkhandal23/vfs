import {
  BookOpen,
  Target,
  Brain,
  Trophy,
  CheckCircle,
  Phone,
} from "lucide-react";

export default function NeevPage() {
  return (
    <div className="bg-[#F4F8FB]">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white py-20 text-center">

        <h1 className="text-[34px] md:text-[52px] font-semibold">
          NEEV – Pre Foundation Program
        </h1>

        <p className="mt-4 max-w-[700px] mx-auto text-sm md:text-[18px] text-white/90">
          Strong foundation for Classes 6–10 to prepare for JEE, NEET, CLAT, CUET & Olympiads
        </p>

      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-16 px-4 md:px-6 max-w-[1100px] mx-auto">

        <h2 className="text-[26px] md:text-[34px] font-semibold text-[#0A2342] text-center">
          What is NEEV Program?
        </h2>

        <p className="mt-6 text-center text-gray-600 max-w-[800px] mx-auto leading-[1.7]">
          NEEV is a specially designed pre-foundation program for students of Classes 6 to 10,
          aimed at building strong concepts, logical thinking, and early preparation for
          competitive exams. It ensures students stay ahead academically and develop confidence.
        </p>

      </section>

      {/* ================= EXAMS ================= */}
      <section className="bg-white py-16 px-4 md:px-6">

        <h2 className="text-[26px] md:text-[34px] font-semibold text-center text-[#0A2342]">
          Target Exams
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-[900px] mx-auto">

          {["JEE", "NEET", "CLAT", "CUET", "Olympiads"].map((exam, i) => (
            <div
              key={i}
              className="bg-[#F4F8FB] p-5 rounded-xl text-center shadow-sm hover:shadow-md transition"
            >
              <Target className="mx-auto text-[#00CFC8]" />
              <p className="mt-2 font-semibold">{exam}</p>
            </div>
          ))}

        </div>

      </section>

      {/* ================= WHY NEEV ================= */}
      <section className="py-16 px-4 md:px-6 max-w-[1100px] mx-auto">

        <h2 className="text-[26px] md:text-[34px] font-semibold text-center text-[#0A2342]">
          Why Choose NEEV?
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          {[
            "Strong Concept Building",
            "Early Competitive Preparation",
            "Experienced Faculty",
            "Personal Attention",
            "Regular Tests & Analysis",
            "Focus on Problem Solving",
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <CheckCircle className="text-[#00CFC8]" />
              <p className="mt-3 text-sm font-medium">{item}</p>
            </div>
          ))}

        </div>

      </section>

      {/* ================= LEARNING APPROACH ================= */}
      <section className="bg-white py-16 px-4 md:px-6">

        <div className="max-w-[1100px] mx-auto text-center">

          <h2 className="text-[26px] md:text-[34px] font-semibold text-[#0A2342]">
            Our Learning Approach
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            {[
              {
                icon: Brain,
                text: "Concept-based learning with deep understanding",
              },
              {
                icon: BookOpen,
                text: "Integrated school + competitive syllabus",
              },
              {
                icon: Trophy,
                text: "Regular tests and performance tracking",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-[#F4F8FB] p-6 rounded-xl shadow-sm">
                  <Icon className="text-[#0A2342]" size={24} />
                  <p className="mt-3 text-sm">{item.text}</p>
                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-[900px] mx-auto">

          <div className="bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white rounded-2xl p-10 text-center shadow-xl">

            <h3 className="text-[26px] md:text-[32px] font-semibold">
              Start Early. Stay Ahead.
            </h3>

            <p className="mt-3 text-white/80">
              Enroll your child in NEEV and build a strong academic foundation
            </p>

            <a
              href="tel:9001700414"
              className="mt-6 inline-flex items-center gap-2 bg-white text-[#0A2342] px-7 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              <Phone size={16} />
              Apply Now
            </a>

          </div>

        </div>
      </section>

    </div>
  );
}