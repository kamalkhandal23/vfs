import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is M2M Ferries?",
    answer: "M2M Ferries provides ferry services between Mumbai and Mandwa.",
  },
  {
    question: "How to book tickets?",
    answer: "You can book tickets online via the official website.",
  },
  {
    question: "Are pets allowed?",
    answer: "Yes, there is a dedicated pet zone onboard.",
  },
];

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-neutral-light py-16 px-6">
      <div className="max-w-[900px] mx-auto">

        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="mb-4 rounded-[10px] bg-white shadow-sm border border-[#E5EDF3]"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="text-[16px] font-medium text-primary">
                  {item.question}
                </span>

                <ChevronDown
                  className={`transition ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* ANSWER */}
              {isOpen && (
                <div className="px-5 pb-4 text-[14px] text-secondary">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}