// Based on your original file :contentReference[oaicite:0]{index=0}

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import faqAmicoIcon from "../../assets/icons/FAQs-amico 1.png";
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

/* ================= MOBILE ROWS ================= */

const MOBILE_CATEGORY_ROWS = [
  ["Admissions", "Academics", "Facilities"],
  ["Transport", "Safety"],
  ["Exams", "Contact"],
];

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
    <section className="bg-[#F4F8FB] px-4 py-10 md:px-6">

      {/* MOBILE */}
      <div className="mx-auto max-w-[1100px] md:hidden">

        <h2 className="text-[20px] font-bold text-[#0A2342]">
          Frequently Asked Questions
        </h2>

        {/* CATEGORY */}
        <div className="mt-4 flex flex-wrap gap-2">
          {MOBILE_CATEGORY_ROWS.flat().map((name) => {
            const Icon = CATEGORY_ICON[name];
            return (
              <FilterButton
                key={name}
                icon={Icon}
                active={activeCategory === name}
                onClick={() => setActiveCategory(name)}
              >
                {name}
              </FilterButton>
            );
          })}
        </div>

        {/* FAQ LIST */}
        <div className="mt-5 flex flex-col gap-2">
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

        {/* CONTACT */}
        <div className="mt-6">
          <p className="text-sm">
            Have more questions? Call us:
          </p>
          <p className="font-semibold text-[#0A2342]">
            +91 9001700414
          </p>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:block max-w-[1100px] mx-auto">

        <h2 className="text-center text-[28px] font-semibold text-[#0A2342]">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 grid grid-cols-[260px_1fr] gap-6">

          {/* LEFT */}
          <div className="flex flex-col gap-3">
            {Object.keys(FAQ_DATA).map((cat) => {
              const Icon = CATEGORY_ICON[cat];
              return (
                <CategoryBtn
                  key={cat}
                  icon={Icon}
                  active={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  full
                >
                  {cat}
                </CategoryBtn>
              );
            })}

            <img
              src={faqAmicoIcon}
              className="mt-4 max-w-[200px]"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3">
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

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="bg-[#0A2342] text-white px-6 py-2 rounded-md"
          >
            CONTACT US
          </Link>
        </div>

      </div>
    </section>
  );
}

/* ================= SMALL COMPONENTS ================= */

function FilterButton({ children, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
        active ? "bg-[#0A2342] text-white" : "bg-white border"
      }`}
    >
      <Icon size={14} />
      {children}
    </button>
  );
}

function FAQItem({ question, answer, open, onToggle }) {
  return (
    <div className="border rounded-md bg-white">
      <button
        onClick={onToggle}
        className="flex justify-between w-full px-4 py-3"
      >
        {question}
        <ChevronDown className={open ? "rotate-180" : ""} />
      </button>

      {open && (
        <div className="px-4 pb-3 text-sm text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
}

function CategoryBtn({ children, icon: Icon, active, onClick, full }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-full ${
        active ? "bg-[#0A2342] text-white" : "bg-white border"
      } ${full ? "w-full" : ""}`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}