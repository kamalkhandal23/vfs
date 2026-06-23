const operationalTerms = [
  "Passengers need to arrive 45 minutes before the trip. Check-in counters close 15 minutes before departure, and boarding closes 10 minutes before departure.",
  "Crew instructions must be followed at all times.",
  "For M2M-1, Skoda Kylaq Zone passengers have access to the Skoda Kylaq Zone, vehicle deck and pet zone only.",
  "For M2M-1, Skoda Kushaq Deck passengers have access to all areas except the Skoda Kodiaq Lounge.",
  "For M2M Princess, passengers are requested to remain seated in their booked seating category.",
  "All passengers provided with wristbands must wear them at all times onboard.",
  "Seating is open plan on a first-come basis only, except for passengers who have reserved paid tables.",
  "No outside food or drinks are allowed on board.",
  "No weapons, corrosive materials, or harmful objects are permitted.",
  "No electric scooters are permitted onboard.",
  "Carrying and consumption of drugs on the ferry and within the terminal premises is strictly prohibited and punishable by law.",
  "Smoking is strictly prohibited onboard.",
  "For M2M-1, pets are only permitted in the Pet Zone or the vehicle deck and are to be accompanied at all times. No pets are allowed on M2M Princess.",
  "Vehicle engines must be turned off with the handbrake engaged and the vehicle kept in gear.",
  "Passengers must pay attention to the safety briefing, evacuation announcements, and the safety instructions located on the ship.",
  "Any misuse of the vessel's property or failure to follow instructions which can endanger the safety of the vessel or passengers can lead to a fine and/or prosecution.",
  "Boarding passes are entitled to physically present passengers only.",
  "Passengers are to travel, park, board, and disembark at their own risk, and M2M Ferries does not accept responsibility for any loss, damage, accident, death or loss of life.",
  "All rights of admission reserved.",
  "Upon purchase of a ticket, passengers are deemed to have read, understood and expressly accepted the terms and conditions available at https://m2mferries.com/terms-conditions.",
];

const cancellationRows = [
  {
    time: "Under 24 hours prior to departure",
    kylaqRefund: "No refund",
    kylaqModification: "No modification",
    kushaqRefund: "No refund",
    kushaqModification: "No modification",
    kodiaqRefund: "No refund",
    kodiaqModification: "Modification at 15% surcharge",
  },
  {
    time: "Between 24 and 72 hours",
    kylaqRefund: "No refund",
    kylaqModification: "Modification at 50% surcharge",
    kushaqRefund: "40% refund",
    kushaqModification: "Modification at 40% surcharge",
    kodiaqRefund: "60% refund",
    kodiaqModification: "Modification at 10% surcharge",
  },
  {
    time: "More than 72 hours prior to departure",
    kylaqRefund: "50% refund",
    kylaqModification: "Modification at 25% surcharge",
    kushaqRefund: "60% refund",
    kushaqModification: "Modification at 20% surcharge",
    kodiaqRefund: "70% refund",
    kodiaqModification: "Modification with no surcharge",
  },
];

const modificationPolicy = [
  "No-show tickets are non-refundable and non-modifiable.",
  "If a passenger arrives up to 10 minutes late and is unable to board the ferry, and seats are available on the same day, the passenger will be rebooked with a surcharge at the counter.",
  "If there are no seats or if the passenger declines to travel, the ticket will be treated as a no-show.",
  "For passengers purchasing tickets for Skoda Kodiaq Lounge, no modification is allowed until 2 hours before departure.",
  "For passengers requesting a trip change, a penalty/fare difference will be applied as above. No fare difference will be refunded.",
  "No refunds are available on any modification charges.",
  "For bookings with more than 25 passengers, passengers must contact support@m2mferries.com.",
];

function renderInlineLinks(text) {
  const parts = String(text).split(/(https?:\/\/[^\s]+|www\.[^\s]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi);

  return parts.map((part, index) => {
    if (!part) return null;

    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(part);
    const isUrl = /^(https?:\/\/|www\.)/i.test(part);

    if (!isEmail && !isUrl) {
      return <span key={index}>{part}</span>;
    }

    const href = isEmail
      ? `mailto:${part}`
      : part.startsWith("http")
        ? part
        : `https://${part}`;

    return (
      <a
        key={index}
        href={href}
        target={isEmail ? undefined : "_blank"}
        rel={isEmail ? undefined : "noreferrer"}
        className="font-medium text-[#0A2342] underline underline-offset-2 hover:text-[#137DC5]"
      >
        {part}
      </a>
    );
  });
}

function SectionBlock({ title, paragraphs = [], bullets = [], children }) {
  return (
    <section className="rounded-[18px] bg-white/55 p-5 md:mt-14 shadow-[0_10px_24px_rgba(7,20,39,0.06)] md:p-7">
      <h3 className="text-[18px] font-semibold text-[#0A2342] md:text-[22px]">{title}</h3>

      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mt-4 text-[14px] leading-7 text-[#1B2B48]/90 md:text-[15px] md:leading-8">
          {renderInlineLinks(paragraph)}
        </p>
      ))}

      {bullets.length > 0 ? (
        <ul className="mt-4 space-y-3 pl-5 text-[14px] leading-7 text-[#1B2B48]/90 md:text-[15px] md:leading-8">
          {bullets.map((item, index) => (
            <li key={index} className="list-disc">
              {renderInlineLinks(item)}
            </li>
          ))}
        </ul>
      ) : null}

      {children}
    </section>
  );
}

function CancellationTable() {
  return (
    <div className="mt-5 overflow-x-auto rounded-[14px] border border-[#D6DEE6] bg-white">
      <table className="min-w-[980px] w-full border-collapse text-left text-[13px] text-[#1B2B48]">
        <thead className="bg-[#EAF4FA] text-[#0A2342]">
          <tr>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Time Prior to Departure</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kylaq Zone Refund</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kylaq Zone Date / Time Modification</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kushaq Deck / Zone / Slavia Lounge Refund</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kushaq Deck / Zone / Slavia Lounge Date / Time Modification</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kodiaq Lounge Refund</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kodiaq Lounge Date / Time Modification</th>
          </tr>
        </thead>
        <tbody>
          {cancellationRows.map((row) => (
            <tr key={row.time}>
              <td className="border-b border-[#E3EAF0] px-4 py-3 font-medium">{row.time}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.kylaqRefund}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.kylaqModification}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.kushaqRefund}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.kushaqModification}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.kodiaqRefund}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.kodiaqModification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicyContent() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(148,212,255,0.25)_0%,#FFFFFF_100%)]">
      <section className="mx-auto max-w-[1450px] px-4 pt-14 pb-8 md:px-10 md:pt-20 md:pb-12">
        <div className="space-y-6">
          <SectionBlock
            title="Privacy Policy of M2M Ferries Private Limited"
            paragraphs={[
              "The document provided for this update contains M2M Ferries operational policy, ticketing rules, and cancellation conditions. The content below has been updated from that source and structured for clear presentation on the Privacy Policy page.",
              "This page now reflects the latest policy content shared in the October 2025 document, including passenger conduct rules, vessel access restrictions, and booking/cancellation rules.",
            ]}
          />

          <SectionBlock title="Passenger Terms And Operational Policy" bullets={operationalTerms} />

          <SectionBlock title="Modification And Cancellation Policy" bullets={modificationPolicy}>
            <CancellationTable />
          </SectionBlock>
        </div>
      </section>
    </main>
  );
}
