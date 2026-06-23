import schoolImg from "../../assets/icons/admission.png";
import { CheckCircle } from "lucide-react";
import AdmissionFormModal from "../../components/ui/modal/AdmissionFormModal";
import { useState } from "react";
export default function AdmissionSection() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <section className="w-full bg-[#0A2342] text-white py-12 md:py-20">

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* LEFT CONTENT */}
          <div className="max-w-[520px]">

            <h2 className="text-[26px] md:text-[36px] font-semibold">
              Admissions Open for 2026-27
            </h2>

            <p className="mt-3 text-[14px] md:text-[16px] text-white/80 leading-[1.6]">
              Give your child the best education with modern facilities, experienced teachers,
              and strong academic support.
            </p>

            {/* FEATURES */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

              {[
                "Experienced Faculty",
                "Competitive Exam Preparation",
                "Smart Classrooms",
                "Safe Transport Facility",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">

                  {/* ICON */}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                    <CheckCircle size={16} className="text-[#00CFC8]" />
                  </div>

                  {/* TEXT */}
                  <span>{item}</span>

                </div>
              ))}

            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-4 flex-wrap">

            

              <button
                onClick={() => setOpenForm(true)}
                className="mt-8 bg-white text-[#0A2342] px-5 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                Apply Now
              </button>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-[420px]">
            <img
              src={schoolImg}
              alt="admission"
              className="w-full object-contain"
            />
          </div>

        </div>
      </section>
      <AdmissionFormModal
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
      />
    </>
  );
}