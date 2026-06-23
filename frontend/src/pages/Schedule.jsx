import {
  CheckCircle,
  FileText,
  Phone,
  School,
  ClipboardList,
  UserCheck,
  BadgeCheck,
} from "lucide-react";

import AdmissionFormModal from "../components/ui/modal/AdmissionFormModal";
import { useEffect, useRef, useState } from "react";
import admissionVideo from "../assets/videos/admission-video.MP4";
import admissionFallback from "../assets/icons/admission.png";

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
      <section className="py-20 px-4 md:px-6 max-w-[1100px] mx-auto">
        <h2 className="text-center text-[28px] md:text-[36px] font-semibold text-[#0A2342]">
          Why Choose Vrinda Foundation School
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">

          {[
            { icon: School, text: "Experienced Faculty" },
            { icon: BadgeCheck, text: "English Medium Education" },
            { icon: ClipboardList, text: "Competitive Exam Preparation" },
            { icon: UserCheck, text: "Personal Attention" },
            { icon: CheckCircle, text: "Smart Classrooms" },
            { icon: CheckCircle, text: "Safe & Disciplined Environment" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2"
              >
                <Icon className="text-[#00CFC8]" size={28} />
                <p className="mt-4 text-[15px] font-medium text-[#0A2342]">
                  {item.text}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="bg-white py-20 px-4 md:px-6">
        <div className="max-w-[1100px] mx-auto text-center">

          <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0A2342]">
            Admission Process
          </h2>

          <div className="mt-14 grid md:grid-cols-4 gap-8">

            {[
              "Fill Application Form",
              "Visit School / Interaction",
              "Submit Documents",
              "Admission Confirmation",
            ].map((step, i) => (
              <div key={i} className="relative">

                {/* STEP CARD */}
                <div className="bg-[#F4F8FB] p-6 rounded-xl shadow-sm hover:shadow-lg transition">

                  <div className="w-10 h-10 mx-auto rounded-full bg-[#00CFC8]/20 text-[#00CFC8] flex items-center justify-center font-bold mb-3">
                    {i + 1}
                  </div>

                  <p className="text-sm text-[#0A2342] font-medium">
                    {step}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section className="py-20 px-4 md:px-6 max-w-[1100px] mx-auto">
        <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0A2342] text-center">
          Required Documents
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-6">

          {[
            "Birth Certificate",
            "Previous Report Card",
            "Transfer Certificate (TC)",
            "Passport Size Photographs",
            "Aadhar Card Copy",
          ].map((doc, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="bg-[#0A2342]/10 p-2 rounded-lg">
                <FileText className="text-[#0A2342]" size={18} />
              </div>

              <p className="text-sm text-[#0A2342] font-medium">
                {doc}
              </p>
            </div>
          ))}

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
