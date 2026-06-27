import { useState } from "react";
import { ChevronDown, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Phone,
  Users,
  Bus,
  Shield,
  Calendar,
} from "lucide-react";

/* ================= CATEGORY ICON ================= */

const CATEGORY_ICON = {
  Admissions: GraduationCap,
  Academics: BookOpen,
  Facilities: Users,
  Transport: Bus,
  Safety: Shield,
  Exams: Calendar,
  Contact: Phone,
};

/* ================= FAQ DATA ================= */

const FAQ_DATA = {
  Admissions: [
    {
      question: "How can I apply for admission?",
      answer:
        "You can apply by visiting the school office or through the admissions page on our website.",
    },
    {
      question: "What classes are available?",
      answer:
        "We offer classes from Play Nursery to Class 12.",
    },
    {
      question: "Is there an entrance test?",
      answer:
        "Yes, admission may include a basic assessment depending on the class.",
    },
  ],

  Academics: [
    {
      question: "Is the school English medium?",
      answer:
        "Yes, Vrinda Foundation School is an English medium school.",
    },
    {
      question: "Do you prepare students for competitive exams?",
      answer:
        "Yes, we provide early preparation for NEET, JEE, CLAT, and NDA.",
    },
  ],

  Facilities: [
    {
      question: "What facilities are available?",
      answer:
        "We provide smart classrooms, labs, sports, library, and activity-based learning.",
    },
    {
      question: "Are classrooms digital?",
      answer:
        "Yes, classrooms are equipped with modern teaching tools and audio-visual aids.",
    },
  ],

  Transport: [
    {
      question: "Is transport facility available?",
      answer:
        "Yes, school transport is available in nearby areas.",
    },
  ],

  Safety: [
    {
      question: "Is the school safe for students?",
      answer:
        "Yes, we maintain a safe and disciplined environment with proper supervision.",
    },
  ],

  Exams: [
    {
      question: "How are exams conducted?",
      answer:
        "We follow regular unit tests, term exams, and performance evaluation.",
    },
  ],

  Contact: [
    {
      question: "How can I contact the school?",
      answer:
        "You can call us at +91 9001700414 or visit the contact page.",
    },
  ],
};

/* ================= MAIN COMPONENT ================= */

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Admissions");

  const currentFaqs = FAQ_DATA[activeCategory] || [];

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq-content" className="relative overflow-x-hidden bg-[#F4F8FB] px-3 py-10 sm:px-4 md:px-6 md:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-10 h-56 w-56 rounded-full bg-[#0A2342]/8 blur-3xl" />
        <div className="absolute right-[-6%] top-36 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-48 w-[34rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid gap-5 lg:grid-cols-[320px_1fr] lg:items-start">
          <aside className="rounded-[24px] border border-[#D7E2EE] bg-white/90 p-4 shadow-[0_20px_50px_rgba(10,35,66,0.08)] backdrop-blur md:rounded-[28px] md:p-6 lg:sticky lg:top-6">
            <div className="flex items-center gap-3 rounded-2xl bg-[#0A2342] px-4 py-3 text-white">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                  Quick help
                </p>
                <p className="text-sm font-medium">
                  Browse by topic
                </p>
              </div>
            </div>

            <div className="mt-5 hidden md:block">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5F718A]">
                Categories
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {Object.keys(FAQ_DATA).map((cat) => {
                  const Icon = CATEGORY_ICON[cat];
                  return (
                    <CategoryBtn
                      key={cat}
                      icon={Icon}
                      active={activeCategory === cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setActiveIndex(null);
                      }}
                      full
                      count={FAQ_DATA[cat].length}
                    >
                      {cat}
                    </CategoryBtn>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 md:hidden">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5F718A]">
                Categories
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {Object.keys(FAQ_DATA).map((cat) => {
                  const Icon = CATEGORY_ICON[cat];
                  return (
                    <FilterButton
                      key={cat}
                      icon={Icon}
                      active={activeCategory === cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setActiveIndex(null);
                      }}
                    >
                      {cat}
                    </FilterButton>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-[#D7E2EE] bg-[#F8FBFF] p-4 md:mt-6">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0A2342] text-white">
                  <PhoneCall size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0A2342]">
                    Need direct help?
                  </p>
                  <p className="mt-1 text-sm text-[#5F718A]">
                    Call the school office or reach us through the contact page.
                  </p>
                  <p className="mt-3 text-lg font-semibold text-[#0A2342]">
                    +91 9001700414
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#12335e]"
            >
              Contact us
              <ArrowRight size={16} />
            </Link>
          </aside>

          <div className="space-y-4 md:space-y-5">
            <div className="space-y-3">
              {currentFaqs.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  open={activeIndex === index}
                  onToggle={() => toggle(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SMALL COMPONENTS ================= */

function FilterButton({ children, icon, active, onClick }) {
  const CategoryIcon = icon;
  return (
    <button
      onClick={onClick}
      className={`flex min-w-0 items-center justify-center gap-2 rounded-full px-3 py-2 text-[12px] font-medium transition-all duration-200 sm:px-4 sm:text-sm ${
        active
          ? "bg-[#0A2342] text-white shadow-[0_12px_30px_rgba(10,35,66,0.22)]"
          : "border border-[#D7E2EE] bg-white text-[#0A2342] hover:border-[#AFC1D8] hover:bg-[#F8FBFF]"
      }`}
    >
      <CategoryIcon size={14} />
      {children}
    </button>
  );
}

function FAQItem({ question, answer, open, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-[24px] border bg-white shadow-[0_14px_30px_rgba(10,35,66,0.06)] transition-all duration-200 ${
        open ? "border-[#0A2342]/30 ring-1 ring-[#0A2342]/10" : "border-[#D7E2EE]"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left md:items-center md:gap-4 md:px-6 md:py-5"
      >
        <span className="min-w-0 flex-1 break-words text-[13px] font-medium leading-6 text-[#0A2342] md:text-[16px]">
          {question}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-transform duration-200 ${
            open
              ? "border-[#0A2342] bg-[#0A2342] text-white"
              : "border-[#D7E2EE] bg-[#F8FBFF] text-[#0A2342]"
          }`}
        >
          <ChevronDown className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} size={18} />
        </span>
      </button>

      {open && (
        <div className="border-t border-[#E8EEF5] px-4 pb-5 pt-0 text-sm leading-7 text-[#5F718A] md:px-6">
          <p className="max-w-3xl break-words">{answer}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A2342] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#12335e] sm:w-auto"
            >
              Talk to us
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryBtn({ children, icon, active, onClick, full, count }) {
  const CategoryIcon = icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between gap-3 rounded-full px-4 py-3 text-left transition-all duration-200 ${
        active
          ? "bg-[#0A2342] text-white shadow-[0_12px_30px_rgba(10,35,66,0.22)]"
          : "border border-[#D7E2EE] bg-white text-[#0A2342] hover:border-[#AFC1D8] hover:bg-[#F8FBFF]"
      } ${full ? "w-full" : ""}`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
            active ? "bg-white/10" : "bg-[#F3F7FC]"
          }`}
        >
          <CategoryIcon size={16} />
        </span>
        <span className="font-medium">{children}</span>
      </span>
      <span
        className={`rounded-full px-2 py-1 text-xs font-semibold ${
          active ? "bg-white/10 text-white" : "bg-[#F3F7FC] text-[#5F718A]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
