import exploreHeroWave from "../../assets/styles/explore-hero-wave.png";
import faqHeroMobile from "../../assets/styles/faq-hero-home.png";
export default function TermsHeroSection() {
  return (
    <section className="relative w-full bg-[linear-gradient(180deg,rgba(148,212,255,0.25)_0%,#FFFFFF_100%)]">
      {/* Dark top background */}
      <div className="hidden md:block">
      <div className="w-full h-[170px] md:h-[175px] bg-[#0A2342]" />

      {/* Wave placed right under the dark area */}
      <div className="absolute left-0 right-0 top-[150px] md:top-[175px] -translate-y-[1px] pointer-events-none z-0">
        <img src={exploreHeroWave} alt="" className="block w-full h-auto" />
      </div>

      {/* Text */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-[62px]  md:pt-[0px] md:pb-[0px] -translate-y-[35px]">
        <h1 className="text-[34px] sm:text-[42px] md:text-[61px] font-semibold text-white">
          Privacy Policy
        </h1>
      </div>
      </div>

      {/* Mobile Hero */}
      <div className="relative block h-[220px] md:hidden">
        {/* bg image */}
        <img
          src={faqHeroMobile}
          alt="FAQ Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0" />

        {/* centered text */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-[32px] font-semibold tracking-wide text-white">
            Privacy Policy
          </h1>
        </div>
      </div>
    </section>
  );
}
