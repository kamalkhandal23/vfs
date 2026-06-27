import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

const PILLARS = [
  {
    icon: BookOpen,
    title: "Concept-Led Learning",
    description:
      "Students move beyond memorization with clear explanations, practice, and guided understanding.",
    accent: "from-sky-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Personal Attention",
    description:
      "Small-group support and attentive teachers help each child learn at a steady, confident pace.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Disciplined Campus",
    description:
      "A structured environment where students feel secure, respected, and ready to grow.",
    accent: "from-emerald-500 to-teal-500",
  },
];

const VALUES = [
  "Strong academic foundation",
  "English-medium communication",
  "Audio-visual classrooms",
  "Supportive teacher guidance",
];

export default function AchievementSection() {
  return (
    <section className="relative overflow-hidden bg-[#F4F8FB] px-4 py-16 md:px-6 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,207,200,0.09),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(19,125,197,0.08),_transparent_30%)]" />

      <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-[560px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1 text-[12px] font-semibold tracking-[0.18em] text-sky-700 uppercase shadow-sm">
            <Sparkles size={14} />
            What Sets Us Apart
          </span>

          <h2 className="mt-4 text-[30px] font-semibold leading-tight text-[#0A2342] md:text-[44px]">
            A school culture built for learning, confidence, and care
          </h2>

          <p className="mt-4 text-[14px] leading-[1.8] text-slate-600 md:text-[16px]">
            Vrinda Foundation School is shaped around consistent teaching, a safe
            environment, and enough personal support for every student to move
            forward with clarity.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div
                key={value}
                className="flex items-center gap-3 rounded-[18px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(10,35,66,0.06)]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A2342]/8 text-[#0A2342]">
                  <GraduationCap size={18} />
                </div>
                <span className="text-[14px] font-medium text-[#0A2342]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-[#00CFC8]/15 blur-3xl" />
          <div className="absolute -right-6 bottom-8 h-32 w-32 rounded-full bg-[#137DC5]/15 blur-3xl" />

          <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_18px_40px_rgba(10,35,66,0.1)] md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
                  Learning framework
                </p>
                <h3 className="mt-2 text-[22px] font-semibold text-[#0A2342] md:text-[28px]">
                  The everyday experience students feel
                </h3>
              </div>

              
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <article
                    key={pillar.title}
                    className="rounded-[24px] border border-slate-200/80 bg-[#F8FBFD] p-5 shadow-[0_10px_24px_rgba(10,35,66,0.06)]"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.accent} text-white shadow-md`}
                    >
                      <Icon size={22} strokeWidth={2.2} />
                    </div>

                    <h4 className="mt-4 text-[17px] font-semibold leading-snug text-[#0A2342]">
                      {pillar.title}
                    </h4>
                    <p className="mt-2 text-[13px] leading-[1.75] text-slate-600">
                      {pillar.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
