import faqHeroMobile from "../../assets/styles/faq-hero-home.png";

export default function FAQHeroSection() {
  return (
    <section className="w-full bg-[#0A2342]">

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="max-w-[1200px] mx-auto px-6 py-16">

          <h1 className="text-[40px] md:text-[56px] font-semibold text-white">
            FAQs
          </h1>

          <p className="mt-2 text-[18px] md:text-[20px] text-white/80">
            Frequently Asked Questions
          </p>

        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="relative md:hidden h-[200px]">

        {/* BG IMAGE */}
        <img
          src={faqHeroMobile}
          alt="FAQ"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* TEXT */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">

          <h1 className="text-[28px] font-semibold text-white">
            FAQs
          </h1>

          <p className="mt-1 text-[14px] text-white/90">
            Frequently Asked Questions
          </p>

        </div>
      </div>

    </section>
  );
}