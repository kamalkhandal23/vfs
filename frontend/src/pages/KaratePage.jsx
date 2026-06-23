import { Award, Trophy, ShieldCheck } from "lucide-react";
import coachImg from "../assets/images/vfs-hero-section/vfs3.jpg";
import student1 from "../assets/images/vfs-hero-section/vfs3.jpg";

export default function KaratePage() {
  return (
    <div className="bg-[#F4F8FB]">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white py-20 text-center">
        <h1 className="text-[32px] md:text-[48px] font-semibold">
          Taekwondo & Karate Classes
        </h1>

        <p className="mt-4 max-w-[700px] mx-auto text-white/90">
          6+ Years of Excellence in Martial Arts Training – Building Discipline,
          Strength & Future Opportunities
        </p>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-16 px-4 md:px-6 max-w-[1100px] mx-auto">

        <h2 className="text-[28px] font-semibold text-[#0A2342] text-center">
          Why Our Martial Arts Program?
        </h2>

        <p className="mt-6 text-center text-gray-600 leading-[1.7] max-w-[800px] mx-auto">
          For the past 6 years, Vrinda Foundation School has been the only school in the
          surrounding area offering professional Taekwondo & Karate training.
          Our students are trained not just for self-defense but also for competitive success,
          discipline, and long-term career opportunities through sports.
        </p>

      </section>

      {/* ================= COACH ================= */}
      <section className="bg-white py-16 px-4 md:px-6">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <img
            src={coachImg}
            alt="Coach"
            className="w-full max-w-[350px] mx-auto rounded-xl shadow-md"
          />

          {/* CONTENT */}
          <div>

            <h2 className="text-[28px] font-semibold text-[#0A2342]">
              Coach Narendra Sharma
            </h2>

            <p className="mt-3 text-gray-600">
              With 27+ years of experience in martial arts, Coach Narendra Sharma has
              trained hundreds of students and helped them achieve excellence at
              state and national levels.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• 27+ Years Experience</li>
              <li>• State & National Level Coaching</li>
              <li>• Tournament Based Training</li>
              <li>• 4 Black Belts & 1 Brown Belt Achievers</li>
            </ul>

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