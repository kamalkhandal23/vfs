import ferry from "../../assets/images/fleet1.png";
import aboutUsDesign from "../../assets/images/aboutusimagedesign.png";

export default function AboutSection() {
  return (
    <section className="bg-neutral-light px-4 pb-[110px] pt-[52px] lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-6 text-center text-[34px] font-semibold tracking-[-0.03em] text-primary md:text-[38px]">
          About M2M Ferries
        </h2>

        {/* Mobile Layout */}
        <div className="relative flex flex-col gap-6 md:hidden">
          <div className="relative z-10 w-full rounded-[40px] bg-card p-6 sm:p-8">
            <div className="max-w-[420px] text-primary">
              <h3 className="mb-6 text-[34px] font-semibold leading-[1.16] tracking-[-0.03em]">
                Redefining Ferry Travel In India
              </h3>

              <p className="text-[16px] leading-[1.8] text-secondary">
                Experience the joy of Maharashtra&apos;s first Ro-Pax ferry! Leave
                roadtrip hassles behind and sail from Mumbai to Mandwa in under 60
                minutes with your vehicle. Enjoy the sea breeze, sunshine, and
                scenic Mumbai Harbour.
              </p>

              <p className="mt-4 text-[16px] leading-[1.8] text-secondary">
                We welcome up to 780 passengers and 120 vehicles, including cars,
                buses, bikes, and cycles. Your furry friends are invited too, with
                a special area for them on board. See you on the sail!
              </p>

              <button className="mt-5 rounded-[10px] bg-primary-dark px-7 py-[14px] text-[15px] font-semibold text-white transition hover:bg-primary">
                LEARN MORE
              </button>
            </div>
          </div>

          <div className="relative z-20 order-first w-full rotate-0 overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
            <img
              src={ferry}
              alt="M2M Ferry"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        {/* Tablet/Desktop Layout */}
        <div className="hidden md:flex md:justify-center md:py-8">
          <img
            src={aboutUsDesign}
            alt="About M2M Ferries Design"
            className="max-w-[1200px] w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
