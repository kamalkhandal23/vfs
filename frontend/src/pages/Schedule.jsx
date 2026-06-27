import {
  FileText,
  Phone,
  ClipboardList,
  CheckCircle2,
  Clock3,
  IdCard,
  Languages,
  School,
  ShieldCheck,
  ClipboardCheck,
  Users,
  Laptop2,
} from "lucide-react";

import AdmissionFormModal from "../components/ui/modal/AdmissionFormModal";
import { useEffect, useRef, useState } from "react";
import admissionVideo from "../assets/videos/admission-video.MP4";
import admissionFallback from "../assets/icons/admission.png";

const WHY_CHOOSE_ITEMS = [
  {
    icon: School,
    title: "Experienced Faculty",
    accent: "from-sky-500/20 via-cyan-500/15 to-teal-500/20",
    iconClass: "text-sky-600",
    description:
      "Dedicated teachers who guide students with subject depth, care, and consistency.",
  },
  {
    icon: Languages,
    title: "English Medium Education",
    accent: "from-violet-500/20 via-fuchsia-500/15 to-pink-500/20",
    iconClass: "text-violet-600",
    description:
      "A confident learning environment that strengthens communication and fluency.",
  },
  {
    icon: ClipboardList,
    title: "Competitive Exam Preparation",
    accent: "from-amber-500/20 via-orange-500/15 to-rose-500/20",
    iconClass: "text-amber-600",
    description:
      "Structured preparation for future academic goals and entrance examinations.",
  },
  {
    icon: Users,
    title: "Personal Attention",
    accent: "from-emerald-500/20 via-lime-500/15 to-teal-500/20",
    iconClass: "text-emerald-600",
    description:
      "Balanced class support with focus on every child’s pace, progress, and needs.",
  },
  {
    icon: Laptop2,
    title: "Smart Classrooms",
    accent: "from-indigo-500/20 via-blue-500/15 to-sky-500/20",
    iconClass: "text-indigo-600",
    description:
      "Modern teaching tools that make lessons more interactive, visual, and effective.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Disciplined Environment",
    accent: "from-rose-500/20 via-red-500/15 to-orange-500/20",
    iconClass: "text-rose-600",
    description:
      "A secure campus culture that supports discipline, confidence, and growth.",
  },
];

const ADMISSION_STEPS = [
  {
    title: "Fill Application Form",
    description: "Complete the admission form with the student’s basic details.",
    icon: ClipboardList,
    accent: "from-sky-500 via-cyan-500 to-teal-500",
  },
  {
    title: "Visit School / Interaction",
    description: "Meet the school team and understand the learning environment.",
    icon: Users,
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
  },
  {
    title: "Submit Documents",
    description: "Share the required records for verification and processing.",
    icon: ClipboardCheck,
    accent: "from-amber-500 via-orange-500 to-rose-500",
  },
  {
    title: "Admission Confirmation",
    description: "Receive confirmation and complete the final admission formalities.",
    icon: CheckCircle2,
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
  },
];

const REQUIRED_DOCUMENTS = [
  {
    title: "Birth Certificate",
    note: "Student identity proof",
    icon: FileText,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "Previous Report Card",
    note: "Academic history",
    icon: FileText,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Transfer Certificate (TC)",
    note: "If applicable",
    icon: FileText,
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Passport Size Photographs",
    note: "Recent student photos",
    icon: FileText,
    accent: "from-rose-500 to-red-500",
  },
  {
    title: "Aadhar Card Copy",
    note: "Parent or student ID",
    icon: IdCard,
    accent: "from-emerald-500 to-teal-500",
  },
];

export default function Admissions() {
  const videoRef = useRef(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playPromise = video.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div className="bg-[#F4F8FB] overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[420px] overflow-hidden py-24 text-center text-white md:min-h-[520px] md:py-32">
        <img
          src={admissionFallback}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          src={admissionVideo}
          poster={admissionFallback}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2342]/85 via-[#0A2342]/70 to-[#137DC5]/65" />

        <div className="relative z-10 flex min-h-[420px] items-center justify-center px-4 md:min-h-[520px]">
          <div>
          <h1 className="text-[34px] md:text-[56px] font-semibold leading-tight">
            Admissions Open 2026–27
          </h1>

          <p className="mt-4 text-sm md:text-[18px] text-white/90 max-w-[650px] mx-auto leading-[1.6]">
            Begin your child’s journey towards academic excellence, discipline, and future success
          </p>

          <button
            onClick={() => setOpenForm(true)}
            className="mt-8 bg-white text-[#0A2342] px-7 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Apply Now
          </button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="relative overflow-hidden py-20 px-4 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F4F8FB] to-[#EDF4FA]" />
        <div className="absolute left-0 top-10 h-56 w-56 rounded-full bg-[#00CFC8]/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[#0A2342]/8 blur-3xl" />

        <div className="relative mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-[#00CFC8]/20 bg-white px-4 py-1 text-[12px] font-semibold tracking-[0.18em] text-[#00A9A3] uppercase shadow-sm">
              Why Families Choose Us
            </span>

            <h2 className="mt-4 text-[30px] font-semibold leading-tight text-[#0A2342] md:text-[44px]">
              Why Choose Vrinda Foundation
            </h2>

            <p className="mt-4 text-[14px] leading-[1.75] text-slate-600 md:text-[16px]">
              A focused school experience with the right mix of strong academics,
              personal care, discipline, and future-ready learning spaces.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group h-full rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_10px_30px_rgba(10,35,66,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,35,66,0.12)]"
                >
                  <div className="flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon
                          size={24}
                          strokeWidth={2.2}
                          className={item.iconClass}
                        />
                      </div>

                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[18px] font-semibold leading-snug text-[#0A2342]">
                        {item.title}
                      </h3>
                      <p className="text-[14px] leading-[1.7] text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="relative overflow-hidden bg-white py-20 px-4 md:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,207,200,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(19,125,197,0.08),_transparent_32%)]" />

        <div className="relative mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-[12px] font-semibold tracking-[0.18em] text-sky-700 uppercase">
              <Clock3 size={14} />
              Step by step
            </span>

            <h2 className="mt-4 text-[30px] font-semibold leading-tight text-[#0A2342] md:text-[42px]">
              Admission Process
            </h2>

            <p className="mt-4 text-[14px] leading-[1.75] text-slate-600 md:text-[16px]">
              A simple admission flow that keeps the journey clear, personal, and
              easy to follow for parents.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="pointer-events-none absolute inset-x-6 top-1/2 hidden h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-slate-200/90 xl:block">
              <span className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[processFlow_4s_linear_infinite]" />
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {ADMISSION_STEPS.map((step, i) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="group relative overflow-visible rounded-[26px] border border-slate-200/80 bg-[#F8FBFD] px-6 pb-12 pt-6 shadow-[0_12px_28px_rgba(10,35,66,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(10,35,66,0.12)]"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.accent} text-white shadow-md`}
                      >
                        <Icon size={24} strokeWidth={2.2} />
                      </div>

                      <div className="min-w-0 pt-1">
                        <h3 className="text-[18px] font-semibold leading-snug text-[#0A2342]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-[1.7] text-slate-600">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2">
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-slate-500 shadow-[0_6px_18px_rgba(10,35,66,0.08)]">
                        STEP 0{i + 1}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes processFlow {
            0% {
              transform: translateX(-140%);
            }
            100% {
              transform: translateX(420%);
            }
          }
        `}</style>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section className="relative overflow-hidden py-20 px-4 md:px-6">
        <div className="absolute inset-0 bg-[#F4F8FB]" />
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />

        <div className="relative mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-[12px] font-semibold tracking-[0.18em] text-[#0A2342] uppercase shadow-sm">
              <FileText size={14} />
              Checklist
            </span>

            <h2 className="mt-4 text-[30px] font-semibold leading-tight text-[#0A2342] md:text-[42px]">
              Required Documents
            </h2>

            <p className="mt-4 text-[14px] leading-[1.75] text-slate-600 md:text-[16px]">
              Keep these documents ready to make the admission verification smooth
              and hassle-free.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {REQUIRED_DOCUMENTS.map((doc) => {
              const Icon = doc.icon;

              return (
                <article
                  key={doc.title}
                  className="group flex items-start gap-4 rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_28px_rgba(10,35,66,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(10,35,66,0.1)]"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${doc.accent} text-white shadow-md`}
                  >
                    <Icon size={21} strokeWidth={2.2} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold leading-snug text-[#0A2342]">
                      {doc.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.6] text-slate-500">
                      {doc.note}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA (FIXED DESIGN) ================= */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-[900px] mx-auto">

          <div className="bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white rounded-2xl p-10 text-center shadow-xl">

            <h3 className="text-[26px] md:text-[32px] font-semibold">
              Need Help with Admission?
            </h3>

            <p className="mt-3 text-white/80 text-sm md:text-[15px]">
              Call us for complete guidance and admission support
            </p>

            <a
              href="tel:9001700414"
              className="mt-6 inline-flex items-center gap-2 bg-white text-[#0A2342] px-7 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              <Phone size={16} />
              +91 9001700414
            </a>

          </div>

        </div>
      </section>

<AdmissionFormModal
  isOpen={openForm}
  onClose={() => setOpenForm(false)}
/>
    </div>
  );
}
