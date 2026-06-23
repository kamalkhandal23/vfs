import admissionIcon from "../../assets/icons/admission.png";
import learningIcon from "../../assets/icons/learning.png";
import successIcon from "../../assets/icons/success.png";
import { useInView } from "../../hooks/useInView";

const STEPS = [
  {
    icon: admissionIcon,
    title: "Admission & Enrollment",
    description:
      "Simple and guided admission process ensuring a smooth start for every student.",
  },
  {
    icon: learningIcon,
    title: "Learning & Development",
    description:
      "Concept-based learning with focus on academics and competitive exam preparation.",
  },
  {
    icon: successIcon,
    title: "Results & Future Success",
    description:
      "Strong foundation for exams like NEET, JEE, CUET, NDA and future careers.",
  },
];

export default function StudentJourneySection() {
  const [ref1, show1] = useInView();
  const [ref2, show2] = useInView();
  const [ref3, show3] = useInView();

  return (
    <section className="w-full py-14 md:py-20 bg-[#F4F8FB]">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">

        {/* HEADING */}
        <div className="text-left md:text-center">
          <h2 className="text-[22px] font-bold text-[#0A2342] md:text-[32px]">
            How Your Child Grows at Vrinda Foundation School
          </h2>

          <p className="mt-2 max-w-[720px] text-[13px] text-gray-600 md:mx-auto md:text-[15px] leading-[1.6]">
            We provide a structured journey from admission to success, focusing on
            strong academics, discipline, and competitive exam preparation.
          </p>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="mt-8 flex flex-col gap-8 md:hidden">
          {STEPS.map((item) => (
            <MobileStep key={item.title} item={item} />
          ))}
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="mt-16 hidden md:block">
          <div className="grid grid-cols-[1fr_150px_1fr_150px_1fr] items-start">

            {/* STEP 1 */}
            <StepCard refProp={ref1} show={show1} delay="0ms" item={STEPS[0]} />

            <Connector />

            {/* STEP 2 */}
            <StepCard refProp={ref2} show={show2} delay="200ms" item={STEPS[1]} />

            <Connector />

            {/* STEP 3 */}
            <StepCard refProp={ref3} show={show3} delay="400ms" item={STEPS[2]} />

          </div>
        </div>
      </div>
    </section>
  );
}


/* ================= STEP CARD ================= */

function StepCard({ refProp, show, delay, item }) {
  return (
    <div
      ref={refProp}
      className={`
        flex flex-col items-center text-center
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{ transitionDelay: delay }}
    >
      <div className="rounded-full bg-[#E6F2FF] p-4 shadow-sm">
        <img src={item.icon} className="w-[70px]" alt="" />
      </div>

      <h3 className="mt-4 text-[17px] font-semibold text-[#0A2342]">
        {item.title}
      </h3>

      <p className="mt-1 text-[13px] text-gray-600 max-w-[220px]">
        {item.description}
      </p>
    </div>
  );
}


/* ================= CONNECTOR ================= */

function Connector() {
  return (
    <div className="pointer-events-none h-[80px] w-full self-start mt-[90px]">
      <svg viewBox="0 0 320 90" className="h-full w-full">
        <path
          d="M10 32 C 52 32, 76 82, 126 82 C 176 82, 194 34, 246 34 C 276 34, 292 44, 310 48"
          fill="none"
          stroke="#4CB8F8"
          strokeWidth="2.5"
          strokeDasharray="1 8"
          className="animate-dotted-flow"
        />
      </svg>
    </div>
  );
}


/* ================= MOBILE ================= */

function MobileStep({ item }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-full bg-[#E6F2FF] p-3">
        <img src={item.icon} className="w-[60px]" alt="" />
      </div>

      <div>
        <h3 className="text-[15px] font-semibold text-[#0A2342]">
          {item.title}
        </h3>
        <p className="mt-1 text-[13px] text-gray-600">
          {item.description}
        </p>
      </div>
    </div>
  );
}