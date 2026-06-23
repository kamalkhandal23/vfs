import directorImg from "../../assets/images/vfs-hero-section/director-sir.jpeg";

export default function DirectorMessageSection() {
  return (
    <section className="bg-[#F4F8FB] py-14 md:py-20">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 grid md:grid-cols-[280px_1fr] gap-8 items-start">

          {/* IMAGE */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={directorImg}
              alt="Director"
              className="w-[220px] md:w-[260px] rounded-xl object-cover shadow-md"
            />

            {/* NAME + DESIGNATION */}
            <div className="mt-4 text-center md:text-left">
              <p className="text-[16px] font-semibold text-[#0A2342]">
                A. K. Saraswat
              </p>
              <p className="text-[13px] text-gray-500">
                Director
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div>

            {/* HEADING */}
            <h2 className="text-[24px] md:text-[30px] font-semibold text-[#0A2342]">
              Director’s Message
            </h2>

            {/* WELCOME */}
            <p className="mt-3 text-[14px] md:text-[15px] text-[#475E75] leading-[1.7] font-medium">
              Welcome to Vrinda Foundation English Medium Senior Secondary School.
            </p>

            {/* PARAGRAPHS */}
            <p className="mt-3 text-[14px] md:text-[15px] text-[#475E75] leading-[1.7]">
              Education is not merely the acquisition of knowledge; it is the shaping of character and the building of a strong, responsible society. At Vrinda Foundation, our mission is to provide a nurturing, disciplined, and inspiring environment where every child feels secure, respected, and encouraged to achieve excellence.
            </p>

            <p className="mt-3 text-[14px] md:text-[15px] text-[#475E75] leading-[1.7]">
              We continuously strive to upgrade our teaching methodologies, academic systems, and infrastructure so that our students receive a modern, high-quality education aligned with the needs of the future. Transparency, discipline, and student welfare remain the guiding principles behind every decision we make.
            </p>

            <p className="mt-3 text-[14px] md:text-[15px] text-[#475E75] leading-[1.7]">
              At the same time, we strongly believe that true education must strengthen the inner self of a child. Spiritual values help children develop resilience, humility, and clarity of purpose, enabling them to face life’s challenges with courage and balance.
            </p>

            {/* HIGHLIGHT QUOTE */}
            <div className="mt-4 border-l-4 border-[#00CFC8] pl-4">
              <p className="text-[14px] md:text-[15px] italic text-[#0A2342]">
                “Every child has potential, and no child should ever be left behind.”
              </p>
            </div>

            <p className="mt-4 text-[14px] md:text-[15px] text-[#475E75] leading-[1.7]">
              With the sincere efforts of our dedicated teachers and the trust of supportive parents, we aim to nurture confident learners, responsible citizens, and compassionate human beings.
            </p>

            {/* SIGNATURE */}
            <div className="mt-6">
              <p className="text-[14px] text-[#0A2342] font-medium">
                Warm Regards,
              </p>

              <p className="mt-1 text-[16px] font-semibold text-[#0A2342]">
                A. K. Saraswat
              </p>

              <p className="text-[13px] text-gray-500">
                Director, Vrinda Foundation Senior Secondary English Medium School
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}