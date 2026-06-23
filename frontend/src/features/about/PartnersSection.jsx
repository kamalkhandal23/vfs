import partner1 from "../../assets/icons/mumbai-port.png";
import partner2 from "../../assets/icons/maritime-board.png";

const FALLBACK_PARTNERS = [
  {
    id: "mumbai-port-trust",
    name: "MUMBAI PORT TRUST",
    logo: partner1,
    alt: "Mumbai Port Trust logo",
  },
  {
    id: "maharashtra-maritime-board",
    name: "MAHARASHTRA MARITIME BOARD",
    logo: partner2,
    alt: "Maharashtra Maritime Board logo",
  },
];

export default function PartnersSection({
  title = "Our Partners",
  partners = FALLBACK_PARTNERS,
}) {
  const safePartners = Array.isArray(partners) && partners.length > 0
    ? partners.filter((partner) => partner?.name && partner?.logo)
    : FALLBACK_PARTNERS;

  return (
    <section className="relative bg-neutral-light px-6 py-12 pb-5 md:pb-5 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1100px] text-center">
        {/* Title */}
        <h2 className="mb-6 text-center text-[24px] font-semibold text-primary md:mb-10 md:text-[34px]">
          {title}
        </h2>

        {/* dotted connector (tablet/desktop) */}
       

        {/* Partner Cards */}
        <div className="flex flex-col gap-5 md:flex-row md:justify-center md:gap-10">
          {safePartners.map((partner) => (
            <PartnerCard
              key={partner.id || partner.name}
              logo={partner.logo}
              name={partner.name}
              alt={partner.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ logo, name, alt }) {
  return (
    <article className="flex w-full max-w-full flex-col items-center justify-center rounded-[18px] border border-[#D6DEE6] bg-white py-6 px-4 text-center shadow-sm md:h-[210px] md:w-[420px] md:rounded-[22px] md:p-0">
      <img
        src={logo}
        alt={alt || `${name} logo`}
        loading="lazy"
        decoding="async"
        className="mb-3 h-[70px] object-contain md:mb-4 md:h-auto md:w-[108px]"
      />
      <p className="text-[12px] font-semibold text-primary md:text-[15px]">
        {name}
      </p>
    </article>
  );
}
