import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import coachImg from "../assets/images/vfs-hero-section/vfs3.jpg";
import coachPortrait from "../assets/images/coach.jpeg";
import student1 from "../assets/images/vfs-hero-section/vfs3.jpg";

const HERO_BADGES = [
  { label: "6+ Years of Training", icon: Award },
  { label: "Discipline First", icon: ShieldCheck },
  { label: "Tournament Ready", icon: Trophy },
];

const HERO_STATS = [
  { value: "27+", label: "Years of Coach Experience", icon: Medal },
  { value: "4", label: "Black Belts Achieved", icon: Trophy },
  { value: "100%", label: "Focus on Discipline", icon: Target },
];

export default function KaratePage() {
  return (
    <div className="bg-[#F4F8FB]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#07111F] text-white">
        <img
          src={coachImg}
          alt="Taekwondo and karate training"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/94 via-[#0A2342]/82 to-[#137DC5]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,207,200,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[660px] max-w-[1280px] items-center px-4 py-16 md:px-6 md:py-20">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-[760px] text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[12px] font-semibold tracking-[0.18em] uppercase text-white/90 backdrop-blur-sm">
                <Sparkles size={14} />
                Martial Arts Program
              </span>

              <h1 className="mt-5 text-[36px] font-semibold leading-[1.05] md:text-[60px]">
                Taekwondo & Karate Classes
              </h1>

              <p className="mt-5 max-w-[720px] text-[15px] leading-[1.8] text-white/88 md:text-[18px]">
                6+ Years of Excellence in Martial Arts Training - Building
                Discipline, Strength, Confidence, and Future Opportunities.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                {HERO_BADGES.map((badge) => {
                  const Icon = badge.icon;

                  return (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[12px] font-medium text-white/92 backdrop-blur-sm"
                    >
                      <Icon size={14} />
                      {badge.label}
                    </span>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#00CFC8] px-7 py-3.5 text-[15px] font-semibold text-[#0A2342] shadow-[0_14px_30px_rgba(0,207,200,0.28)] transition hover:scale-[1.03]">
                  Join Training
                  <ArrowRight size={16} />
                </button>

                <button className="rounded-full border border-white/50 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white hover:text-[#0A2342]">
                  View Gallery
                </button>
              </div>
            </div>

            <div className="relative mt-6 lg:mt-10">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-[#00CFC8]/20 blur-3xl" />
              <div className="absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/10 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-6">
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#081625]/65">
                  <img
                    src={student1}
                    alt="Martial arts training"
                    className="h-[280px] w-full object-cover md:h-[360px]"
                  />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {HERO_STATS.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-[22px] border border-white/10 bg-white/8 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00CFC8]/15 text-[#00CFC8]">
                            <Icon size={20} />
                          </div>

                          <div>
                            <p className="text-[22px] font-semibold text-white">
                              {item.value}
                            </p>
                            <p className="text-[12px] leading-snug text-white/72">
                              {item.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,207,200,0.09),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(19,125,197,0.08),_transparent_30%)]" />

        <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-[560px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1 text-[12px] font-semibold tracking-[0.18em] text-sky-700 uppercase shadow-sm">
              <BookOpen size={14} />
              Program Focus
            </span>

            <h2 className="mt-4 text-[30px] font-semibold leading-tight text-[#0A2342] md:text-[44px]">
              Why Our Martial Arts Program?
            </h2>

            <p className="mt-4 text-[14px] leading-[1.85] text-slate-600 md:text-[16px]">
              For the past 6 years, Vrinda Foundation School has been the only
              school in the surrounding area offering professional Taekwondo &
              Karate training. Our students are trained not just for self-defense
              but also for competitive success, discipline, and long-term career
              opportunities through sports.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Self-defense with confidence",
                "Tournament-focused training",
                "Discipline and routine",
                "Future sports opportunities",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-[18px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(10,35,66,0.06)]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A2342]/8 text-[#0A2342]">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-[14px] font-medium text-[#0A2342]">
                    {point}
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
                    Training Outcomes
                  </p>
                  <h3 className="mt-2 text-[22px] font-semibold text-[#0A2342] md:text-[28px]">
                    Built for growth, discipline, and competition
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-md">
                  <Sparkles size={22} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Trophy, title: "Winning Mindset", desc: "Focus, stamina, and confidence." },
                  { icon: Award, title: "Recognized Coaching", desc: "Guidance with tournament intent." },
                  { icon: ShieldCheck, title: "Safe Progression", desc: "Age-appropriate training steps." },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="rounded-[24px] border border-slate-200/80 bg-[#F8FBFD] p-5 shadow-[0_10px_24px_rgba(10,35,66,0.06)]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-md">
                        <Icon size={22} strokeWidth={2.2} />
                      </div>
                      <h4 className="mt-4 text-[17px] font-semibold leading-snug text-[#0A2342]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-[13px] leading-[1.75] text-slate-600">
                        {item.desc}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COACH ================= */}
      <section className="relative overflow-hidden bg-white px-4 py-16 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,248,251,0.9)_0%,rgba(255,255,255,1)_40%,rgba(244,248,251,0.92)_100%)]" />

        <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[#00CFC8]/15 blur-3xl" />
            <div className="absolute -right-6 bottom-10 h-28 w-28 rounded-full bg-[#137DC5]/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white p-5 shadow-[0_18px_40px_rgba(10,35,66,0.1)] md:p-6">
              <div className="overflow-hidden rounded-[28px]">
                <img
                  src={coachPortrait}
                  alt="Coach Narendra Sharma"
                  className="h-[340px] w-full object-cover md:h-[420px]"
                />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["27+ Years", "State & National", "Tournament Based"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[20px] border border-slate-200/80 bg-[#F8FBFD] px-4 py-3 text-center text-[13px] font-semibold text-[#0A2342] shadow-[0_10px_22px_rgba(10,35,66,0.06)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 max-w-[620px] lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-[12px] font-semibold tracking-[0.18em] text-sky-700 uppercase shadow-sm">
              Coach Profile
            </span>

            <h2 className="mt-4 text-[30px] font-semibold leading-tight text-[#0A2342] md:text-[44px]">
              Coach Narendra Sharma
            </h2>

            <p className="mt-4 text-[14px] leading-[1.85] text-slate-600 md:text-[16px]">
              With 27+ years of experience in martial arts, Coach Narendra Sharma
              has trained hundreds of students and helped them achieve excellence
              at state and national levels.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "27+ Years Experience",
                "State & National Level Coaching",
                "Tournament Based Training",
                "4 Black Belts & 1 Brown Belt Achievers",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-[18px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(10,35,66,0.06)]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A2342]/8 text-[#0A2342]">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-[14px] font-medium text-[#0A2342]">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-[#00CFC8]/15 bg-[#F4F8FB] p-5 shadow-[0_12px_28px_rgba(10,35,66,0.06)]">
              <p className="text-[13px] font-semibold tracking-[0.16em] text-sky-700 uppercase">
                Coaching Philosophy
              </p>
              <p className="mt-3 text-[14px] leading-[1.8] text-slate-600 md:text-[15px]">
                Discipline first, then technique, then confidence. Students are
                guided to grow steadily with a balance of focus, respect, and
                tournament readiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="py-16 px-4 md:px-6 max-w-[1100px] mx-auto">

        <h2 className="text-[28px] text-center font-semibold text-[#0A2342]">
          Achievements & Performance
        </h2>

        <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <Trophy className="mx-auto text-[#00CFC8]" />
            <p className="mt-3 font-medium">3 Years Continuous Winners</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <Award className="mx-auto text-[#00CFC8]" />
            <p className="mt-3 font-medium">State & National Participation</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <ShieldCheck className="mx-auto text-[#00CFC8]" />
            <p className="mt-3 font-medium">Discipline & Self Defense</p>
          </div>

        </div>

      </section>

      {/* ================= BELT SYSTEM ================= */}
      <section className="bg-white py-16 px-4 md:px-6">

        <div className="max-w-[1100px] mx-auto text-center">

          <h2 className="text-[28px] font-semibold text-[#0A2342]">
            Complete Training Program
          </h2>

          <p className="mt-4 text-gray-600">
            We provide full training from White Belt to Black Belt in Karate,
            ensuring step-by-step development and mastery.
          </p>

        </div>

      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-16 px-4 md:px-6 max-w-[1100px] mx-auto">

        <h2 className="text-[28px] font-semibold text-[#0A2342] text-center">
          Training & Tournament Moments
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">

          {[1,2,3,4,5,6,7,8].map((i) => (
            <img
              key={i}
              src={student1}
              className="rounded-lg object-cover h-[150px] w-full hover:scale-105 transition"
            />
          ))}

        </div>

      </section>

      {/* ================= SPORTS QUOTA ================= */}
      <section className="bg-white py-16 px-4 md:px-6">

        <div className="max-w-[900px] mx-auto text-center">

          <h2 className="text-[28px] font-semibold text-[#0A2342]">
            Beyond Self Defense – Future Opportunities
          </h2>

          <p className="mt-4 text-gray-600 leading-[1.7]">
            Martial arts is not just about self-defense. It opens doors to multiple
            opportunities including sports quota in college admissions, scholarships,
            and even government job benefits. Our training ensures students are
            prepared for both competition and future success.
          </p>

        </div>

      </section>
    </div>
  );
}
