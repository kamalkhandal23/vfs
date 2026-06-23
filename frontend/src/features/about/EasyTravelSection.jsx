import phone1 from "../../assets/icons/phone1.png";
import phone2 from "../../assets/icons/phone2.png";
import dottedPath from "../../assets/icons/travel-path.svg";
import award1 from "../../assets/icons/award1.png";
import award2 from "../../assets/icons/award2.png";
import aboutMobileScreen from "../../assets/images/about-desktop-section-mobilescren.png";

export default function EasyTravelSection({
  title = "We Make Travel Easy & Comfortable",
  description,
  onCTAClick,
  phones = [phone1, phone2],
  awards = [award1, award2],
}) {
  return (
    <section className="relative overflow-visible bg-neutral-light">

      {/* MOBILE */}
      <div className="mx-auto flex max-w-[1300px] flex-col gap-8 px-6 py-12 md:hidden">

        {/* TEXT */}
        <div>
          <h2 className="text-[28px] font-semibold text-primary">
            {title}
          </h2>

          <p className="mt-3 text-[14px] text-gray-600">
            {description}
          </p>
        </div>

        {/* PHONES */}
        <div className="relative flex justify-center">
          <div className="relative h-[320px] w-[240px]">

            {phones.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`phone-${index}`}
                className={`absolute ${index === 0
                    ? "left-0 top-[22px] z-30 w-[150px]"
                    : "right-0 top-0 z-20 w-[162px]"
                  } object-contain`}
              />
            ))}

          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={onCTAClick}
          className="w-full rounded-[12px] bg-primary-dark px-7 py-3 text-white"
        >
          GO BOOK YOUR FERRY !
        </button>

        {/* AWARDS */}
        <div className="flex justify-center gap-6">
          {awards.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`award-${i}`}
              className="h-[52px] object-contain"
            />
          ))}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex justify-center">
        <img
          src={aboutMobileScreen}
          alt="Easy Travel Section"
          className="w-full max-w-[1440px]"
        />
      </div>
    </section>
  );
}