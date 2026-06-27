import { ArrowRight, BadgeInfo, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQHeroSection() {
  return (
    <section className="relative bg-[#0A2342]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-5rem] h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#081A33]" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4 py-14 pt-20 md:px-6 md:py-24 md:pt-28">
        <div className="mx-auto max-w-3xl space-y-5 text-center text-white md:mx-0 md:text-left md:space-y-6">
          <div className="inline-flex items-center gap-2 self-center rounded-full border border-white/15 bg-white/8 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 md:self-start md:px-4 md:text-xs">
            <Sparkles size={14} />
            Help center
          </div>

          <div className="mx-auto max-w-2xl md:mx-0">
            <h1 className="text-3xl font-semibold tracking-tight md:text-6xl">
              FAQs
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/72 md:mt-4 md:text-lg md:leading-7">
              Everything parents and students usually ask about admissions, academics, safety, and daily school life in one calm, easy-to-scan place.
            </p>
          </div>

          <div className="hidden gap-3 md:grid sm:grid-cols-3">
            <HeroStat icon={BadgeInfo} label="Clear answers" value="7 topics" />
            <HeroStat icon={ShieldCheck} label="Student first" value="Safe & guided" />
            <HeroStat icon={Sparkles} label="Need more?" value="Call or visit" />
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:items-start md:justify-start">
            <Link
              to="/contact"
              className="inline-flex w-full max-w-[260px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0A2342] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto sm:max-w-none"
            >
              Contact school
              <ArrowRight size={16} />
            </Link>
            <a
              href="#faq-content"
              className="inline-flex w-full max-w-[260px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:max-w-none"
            >
              Jump to questions
            </a>
          </div>
        </div>


      </div>
    </section>
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
