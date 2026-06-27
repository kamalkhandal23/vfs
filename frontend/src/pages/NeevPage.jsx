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
      <section className="relative overflow-hidden bg-[#071A33] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute right-[-4rem] top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0A2342]" />
        </div>

        <div className="relative mx-auto grid max-w-[1180px] gap-10 px-4 py-16 pt-20 md:px-6 md:py-20 md:pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              Pre-foundation
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              NEEV - Pre Foundation Program
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/78 md:text-lg">
              A focused foundation program for Classes 6 to 10 that strengthens core concepts,
              builds confidence, and prepares students early for competitive exams.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <HeroStat icon={Brain} label="Concepts" value="Deep learning" />
              <HeroStat icon={Target} label="Goal" value="Exam readiness" />
              <HeroStat icon={Trophy} label="Outcome" value="Strong scores" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:9001700414"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#071A33] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Phone size={16} />
                Apply Now
              </a>
              <a
                href="#neeve-overview"
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore program
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[32px] bg-cyan-300/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/8 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="rounded-[28px] bg-[#0A2342] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  Designed for
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Early preparation with a calm, structured academic path.
                </h2>

                <div className="mt-6 space-y-3">
                  <HeroNote title="Classes 6-10" copy="A focused start before competitive pressure builds." />
                  <HeroNote title="Integrated support" copy="School learning and exam preparation move together." />
                  <HeroNote title="Personal guidance" copy="Regular tests, feedback, and teacher attention." />
                </div>
              </div>

              <div className="mt-4 rounded-[28px] border border-[#D7E2EE] bg-[#F8FBFF] p-5 text-[#0A2342]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5F718A]">
                  Target exams
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["JEE", "NEET", "CLAT", "CUET", "Olympiads"].map((exam) => (
                    <span
                      key={exam}
                      className="rounded-full border border-[#D7E2EE] bg-white px-3 py-2 text-sm font-semibold"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="neeve-overview"
        className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-5rem] top-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="absolute left-[-4rem] bottom-0 h-60 w-60 rounded-full bg-[#0A2342]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[32px] bg-[#0A2342] p-6 text-white shadow-[0_20px_50px_rgba(10,35,66,0.14)] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              About the program
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              What is NEEV Program?
            </h2>
            <p className="mt-5 text-base leading-8 text-white/76">
              NEEV is a specially designed pre-foundation program for students of Classes 6 to 10.
              It builds core concepts early, develops logical thinking, and creates a strong base
              for future competitive exam preparation.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <MiniStat label="Grade span" value="Classes 6-10" />
              <MiniStat label="Focus" value="Foundation first" />
              <MiniStat label="Method" value="Concept + practice" />
              <MiniStat label="Result" value="Confidence" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Build strong basics",
                copy: "Students learn each topic with enough clarity before moving ahead.",
              },
              {
                title: "Stay ahead early",
                copy: "The program starts exam preparation before pressure becomes overwhelming.",
              },
              {
                title: "Think with confidence",
                copy: "Regular guidance helps students approach problems with better focus.",
              },
              {
                title: "Balanced learning",
                copy: "School academics and competitive preparation stay aligned throughout.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-[#D7E2EE] bg-white p-6 shadow-[0_16px_40px_rgba(10,35,66,0.06)]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F3F7FC] text-[#0A2342]">
                  <CheckCircle size={18} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#0A2342]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#5F718A]">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXAMS ================= */}
      <section className="bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F718A]">
              Target exams
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A2342] md:text-4xl">
              Target Exams
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5F718A]">
              NEEV prepares students for a broad set of competitive pathways so they can build
              useful habits early and keep future options open.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {["JEE", "NEET", "CLAT", "CUET", "Olympiads"].map((exam, i) => (
              <div
                key={exam}
                className="group rounded-[28px] border border-[#D7E2EE] bg-[#F8FBFF] p-5 shadow-[0_14px_34px_rgba(10,35,66,0.05)] transition-transform duration-200 hover:-translate-y-1 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0A2342] text-white">
                    <Target size={18} />
                  </div>
                
                </div>
                <p className="mt-8 text-lg font-semibold text-[#0A2342]">
                  {exam}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5F718A]">
                  Early exposure and structured practice.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY NEEV ================= */}
      <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-5rem] top-20 h-64 w-64 rounded-full bg-[#0A2342]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1180px]">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F718A]">
              Why students join
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A2342] md:text-4xl">
              Why Choose NEEV?
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Strong Concept Building",
              "Early Competitive Preparation",
              "Experienced Faculty",
              "Personal Attention",
              "Regular Tests & Analysis",
              "Focus on Problem Solving",
            ].map((item, i) => (
              <div
                key={item}
                className="rounded-[28px] border border-[#D7E2EE] bg-white p-6 shadow-[0_16px_40px_rgba(10,35,66,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F3F7FC] text-[#0A2342]">
                    <CheckCircle size={18} />
                  </div>
                  
                </div>
                <p className="mt-4 text-lg font-semibold text-[#0A2342]">
                  {item}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#5F718A]">
                  Structured support that keeps students consistent and confident.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEARNING APPROACH ================= */}
      <section className="bg-white px-4 py-16 md:px-6 md:py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F718A]">
              Teaching model
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0A2342] md:text-4xl">
              Our Learning Approach
            </h2>
            <p className="mt-4 text-base leading-8 text-[#5F718A]">
              The program is built around concept clarity, guided practice, and regular feedback,
              so students grow steadily instead of rushing through topics.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "Concept-based learning",
                text: "Deep understanding first, then speed and accuracy follow naturally.",
              },
              {
                icon: BookOpen,
                title: "Integrated syllabus",
                text: "School curriculum and competitive preparation move in sync.",
              },
              {
                icon: Trophy,
                title: "Progress tracking",
                text: "Frequent tests and review sessions help teachers guide students better.",
              },
            ].map((item, i) => {
              const ApproachIcon = item.icon;
              return (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-[32px] border border-[#D7E2EE] bg-[#F8FBFF] p-7 shadow-[0_16px_40px_rgba(10,35,66,0.06)]"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-[#0A2342]/6 blur-2xl" />
                  <div className="relative">
                    <div className="grid h-14 w-14 place-items-center rounded-[18px] bg-[#0A2342] text-white">
                      <ApproachIcon size={20} />
                    </div>
                    
                    <h3 className="mt-4 text-xl font-semibold text-[#0A2342]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#5F718A]">
                      {item.text}
                    </p>
                  </div>
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

function HeroStat({ icon, label, value }) {
  const StatIcon = icon;
  return (
    <div className="rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-white">
          <StatIcon size={16} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/55">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroNote({ title, copy }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-white/70">{copy}</p>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
}
