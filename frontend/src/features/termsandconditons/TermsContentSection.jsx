const introductoryParagraphs = [
  'FOLLOWING ARE THE TERMS AND CONDITIONS GOVERNING THE PROVISIONING OF RO-PAX FERRY AND TERMINAL RELATED SERVICES (“SERVICES”) BY M2M FERRIES PRIVATE LIMITED (“OPERATOR”) TO THE PERSON(S) ("USER / PASSENGER") WHO AGREE TO AVAIL THE SERVICES OF THE OPERATOR BY PURCHASING THE RO-PAX FERRY TICKET. BY PURCHASING THE TICKET OR MERCHANDISE, THE USER EXPRESSLY AGREES TO BE BOUND BY THESE TERMS AND CONDITIONS, INCLUDING THE ADDITIONAL TERMS AND CONDITIONS MENTIONED ON THE WEBSITE OF THE OPERATOR i.e. WWW.M2MFERRIES.COM, TERMS OF OUR PRIVACY POLICY, AND ALL APPLICABLE LAWS AND REGULATIONS GOVERNING THE USE OF SERVICES.',
  "CERTAIN OPERATIONAL RULES, REPORTING TIMES, BOARDING PROCEDURES, ONBOARD POLICIES AND SAFETY REQUIREMENTS MAY VARY DEPENDING ON THE ROUTE, VOYAGE DURATION AND/OR VESSEL DEPLOYED.",
  "WHERE SUCH DIFFERENCES APPLY, THE ROUTE-SPECIFIC AND/OR VESSEL-SPECIFIC CONDITIONS COMMUNICATED AT THE TIME OF BOOKING, ON THE TICKET, ON THE OPERATOR’S WEBSITE, OR AT THE TERMINAL SHALL PREVAIL OVER THE GENERAL TERMS STATED HEREIN.",
];

const routeConditions = [
  "Ticket is valid only for the specific date and trip timing booked. Changes/refund, if any, are applicable as per the rules specified.",
  "Online booking closes 60 minutes before scheduled departure, subject to seat availability.",
  "Unless otherwise specified for a particular route or voyage: passengers must report at least 45 minutes prior to departure; check-in counters and terminal gates close 15 minutes prior to departure; boarding closes 10 minutes prior to departure.",
  "For sailings between Mumbai and Vijaydurg (and other long-distance sailings as may be notified): passengers must report at least 90 minutes prior to departure; check-in counters close 30 minutes prior to departure; boarding closes 15 minutes prior to departure.",
  "Passengers arriving after check-in closure will be treated as no-show, subject to the rebooking policy stated below.",
  "Passengers who arrive at the terminal up to 10 minutes after check-in closure may be rebooked on another trip on the same day with a 50% surcharge, subject to availability. If this option is not chosen or seats are unavailable, no refund is applicable.",
  "All passengers are requested to carry a valid government-issued photo ID proof.",
  "All passengers require a ticket. Children above the age of 2 days and under the age of 3 years as on the date of travel are treated as infants. Age proof may be asked at the time of check-in. Tickets for infants are available at concessional rates. All passengers above 3 years require a full ticket.",
  "Priority will be given to emergency services at all times.",
  "Vehicle drivers must have a valid driving licence, vehicle registration and insurance documents on person. Documentation may be requested for security and verification. Boarding can be denied in the absence of any of the above at the discretion of the Operator.",
  "Smoking, vaping, spitting and chewing tobacco on the ferry and within the terminal premises is strictly prohibited and punishable by law. A penalty of up to Rs. 5,000 per offence may be charged.",
  "Commercial photography or videography is not permitted unless expressly allowed by the Operator.",
  "Carrying or consuming drugs, outside alcohol, or engaging in misconduct with M2M staff, ferry crew or fellow passengers is strictly prohibited and punishable by law.",
  "Damage to ferry/terminal property, spitting, littering, defecating and wrongful parking are punishable by law and/or subject to penalty at the Operator’s discretion.",
  "Pets are not permitted on M2M Princess vessel.",
  "Pet animals and birds are only allowed in the designated pet areas of the ferry. Only passengers with vehicles or suitable special equipment are allowed to bring pets on board. Pets must remain inside vehicles or in the designated pet area while on board, and muzzles and leash are mandatory.",
  "If the passenger is travelling with a pet, this must be declared at the time of booking and in advance of travel. The Operator may permit or not permit the pet(s) prior to departure.",
  "Animal owners are liable for any soiling caused by the animal. If not promptly and properly cleaned, the Operator may invoice cleaning costs with a minimum charge of Rs. 3,000.",
  "The Operator shall not be responsible for the health and safety of any pets brought on board.",
  "Correction of passenger name is not permitted once the ticket is booked.",
  "Passengers may not carry inflammable liquids, explosives, corrosives, arms, ammunition, or any harmful articles.",
  "The Operator may remove harmful objects including cutters, knives, explosives and inflammables to ensure safety.",
  "Emergency first aid for passengers will be available at all times.",
  "The Operator is not responsible for any loss or damage to passenger belongings, vehicles or any issues caused by pets on board.",
  "Passengers travel, park, board and disembark at their own risk. Right of admission is reserved.",
  "All baggage carried by passengers is at their own risk. Operator provides only a small designated area for baggage onboard and takes no responsibility for damage or loss. Valuables must not be left in baggage.",
  "The Operator is not liable for damage or loss caused by roadwork, traffic conditions, lack of road markings or instructions, abnormal water levels, terminal ramps or similar conditions while driving or walking in the terminal area or boarding/disembarking.",
  "The Operator is not liable for damage to vehicles caused by the vehicle being lowered, moved or heavily loaded, or for damage to special equipment or luggage attached outside or on top of vehicles while the ferry is in motion.",
  "No refund for downgrading of seat, vehicle or pet once booking is confirmed.",
  "No refund for any surcharge paid. Passengers may request an upgrade of seat already selected subject to availability and payment of fare difference.",
  "All tickets are non-transferable.",
  "All passengers, luggage and vehicles are subject to security checks at the Operator’s discretion.",
  "The Operator is not liable for any loss or damage to luggage handled by any employee or representative of M2M Ferries Pvt. Ltd.",
  "Non-vehicle passengers are allowed only one hand baggage per passenger not exceeding 55 cm x 35 cm x 25 cm.",
  "No cargo/goods vehicles are permitted.",
  "Lost tickets will result in issuance of a new ticket at full price subject to availability.",
  "Unauthorised parking may result in vehicle clamping and release fees.",
  "Consumption of outside food/drinks is strictly prohibited in the terminal area and onboard the ferry.",
  "Drinking and driving is strictly prohibited in the terminal area and on the ferry. The Operator reserves the right to take appropriate action.",
  "Music system will be operated at the discretion of the Operator.",
  "Tickets may only be issued by M2M Ferries Pvt. Ltd. and its authorised booking partners.",
];

const additionalTerms = [
  "By accessing the website and using any service provided thereon, users expressly agree to be bound by these terms and conditions, the privacy policy, and all applicable laws and regulations. If you do not agree, you are not authorised to use the services and/or the website.",
  "The Operator reserves the right to cancel or change the published voyage for official purposes, bad weather, technical reasons or other operational reasons. In such cases, the passenger may claim a full refund or reschedule subject to availability. For long-distance sailings (including Mumbai–Vijaydurg), voyage duration may vary due to weather, port traffic, regulatory requirements, tidal conditions or operational factors; the Operator is not liable for onward travel arrangements or consequential losses.",
  "The Operator may substitute or reassign the vessel scheduled for any voyage without prior notice, provided the class of service remains the same or higher.",
  "The passenger warrants that they, including any accompanying children and/or babies in arms, do not suffer from any major illness or ailment. The Operator is not responsible for consequences resulting from pre-carriage illness/ailments and the passenger indemnifies the Operator accordingly.",
  "Boarding involves acceptance of the risks related to limited onboard medical services, pregnancy-related emergencies and the specific nature of sea transport. For extended sailings, passengers with medical conditions, advanced pregnancy, motion sickness sensitivity or requiring regular medication should consult a doctor before travel and carry necessary medication.",
  "The Operator has no liability for any injury or illness not attributable to any act, neglect or default on its part.",
  "The ticket and carriage of passengers and vehicles are governed by Indian law and the exclusive jurisdiction of the competent courts in Mumbai, India.",
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
    time: "Between 24 and 72 hours prior to departure",
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
  "All tickets are non-transferable.",
  "In case of cancellation of ferry service on account of bad/inclement weather, Maharashtra Maritime Board orders/notices, or technical circumstances, the ticket booking amount shall be refunded less taxes/handling charges.",
  "If a passenger arrives up to 10 minutes late and is unable to board, the passenger can be rebooked on the next available trip with surcharge and fare difference if applicable; otherwise the ticket will be treated as a no-show.",
  "The policy table below applies only to individual bookings up to 25 passengers. For group bookings above 25 passengers, passengers must contact the Operator for the applicable cancellation and modification policy.",
  "For passengers purchasing tickets for Skoda Kodiaq Lounge, no modification until 2 hours to departure.",
  "For passengers requesting a trip change, penalty/fare difference will be applied as above. No fare difference will be refunded.",
  "Refunds are processed on the base charge only, excluding extra charges including but not limited to modification surcharge.",
  "Refund processing time is up to 10–15 working days and will be credited to the customer’s source account.",
  "On request, M2M Ferries is liable to provide ARN/UTR for refunds made. In case of non-receipt in the bank account, the passenger must provide the documents required to support the claim.",
];

const baggageRows = [
  {
    category: "Skoda Kylaq Zone",
    bags: "1 bag",
    weight: "Up to 15 kg",
  },
  {
    category: "Skoda Kushaq Zone",
    bags: "1 bag",
    weight: "Up to 20 kg",
  },
  {
    category: "Skoda Slavia Lounge",
    bags: "2 bags",
    weight: "Up to 25 kg total",
  },
  {
    category: "Skoda Kodiaq Lounge",
    bags: "2 bags",
    weight: "Up to 30 kg total",
  },
];

const baggagePolicy = [
  "For sailings between Mumbai and Vijaydurg, the baggage allowance listed in the table below applies in place of the general baggage limits for that route only. Any baggage exceeding the permitted quantity or weight may be subject to excess charges or refusal at the discretion of the Operator.",
  "For general sailings, luggage of 10 kg per passenger is allowed. Above this, charges will apply and passengers must contact the Operator for details.",
  "Non-vehicle passengers are allowed only one hand baggage per passenger, not bigger than 55 cm x 35 cm x 25 cm.",
  "For every additional luggage item outside permissible limits, Rs. 200 per baggage will be levied.",
  "Operator reserves the right to refuse boarding of additional luggage outside the permissible limit.",
  "Goods intended for resale, trade samples, or goods to be used commercially are not considered luggage and must be registered as freight before departure. Passengers must contact the Operator in advance for the additional cost.",
  "Dangerous luggage/freight must be reported no later than 24 hours before departure. Unreported dangerous goods may be brought ashore, removed or destroyed without liability on the Operator.",
  "Passengers are liable to the Operator for direct and indirect damage caused by dangerous goods not reported in accordance with these terms.",
];

const safetySecurity = [
  "Passengers must comply with all regulations and notices relating to the safety and security of the ferry, its crew, passengers and terminal facilities. Passengers must allow searches of person, vehicle or baggage by authorised persons of the Operator if requested. Refusal may lead to denial of travel with no refund.",
  "Passengers must conduct themselves in a manner that respects the health, comfort and safety of others and comply with instructions made by staff. The Operator may refuse embarkation, require disembarkation or ask the passenger to leave terminal facilities without refund where conduct gives cause for concern.",
  "If a passenger endangers the ferry/terminal, obstructs staff, fails to comply with instructions, or uses threatening, abusive or insulting language, the Operator may take any measures deemed necessary including restraint, disembarkation, refusal of onward carriage and prosecution.",
  "If a ferry is diverted or delayed to offload a passenger due to misconduct, the passenger is liable for all costs incurred by the Operator.",
  "CCTV surveillance operates throughout the vessel and terminal premises, and staff may also use body-worn cameras. Recordings may be used for security, incident investigation and legal compliance.",
  "The Operator accepts vehicles powered by any fuel type provided they are designed, built and certified for road use by the principal manufacturer and have valid registration documents. This does not apply to electric scooters.",
  "Passengers must lock vehicles, leave them in gear with handbrake on, switch off alarms, and must not carry fuel cans on board, whether full or empty.",
  "Access to the vehicle deck is strictly prohibited while the vessel is in motion. Passengers must take all necessary personal items, including vehicle keys, to the passenger decks before departure.",
  "The Operator may provide valet-style parking assistance onboard as a convenience. Parking remains at the vehicle owner’s risk except in cases of wilful misconduct or gross negligence by the Operator.",
  "Vehicle passengers are only allowed to take one item of hand luggage per person onto the passenger decks.",
  "If the passenger forgets personal property after the journey, the Operator may dispose of it after a reasonable period and shall not be held responsible.",
  "If passengers, personal property and/or vehicles are not disembarked at journey end for any reason other than fault on the Operator’s part, they may be returned to the terminal at the passenger’s expense.",
  "Parents/guardians/group leaders must supervise children at all times and must not permit children to run around the ferry or use lifts unaccompanied.",
];

const liabilityClaims = [
  "The Operator reserves the right to claim from the passenger for any malicious, wilful or negligent damage sustained to the ferry or terminal property.",
  "The Operator shall not be liable for loss of or damage to cash, negotiable securities, gold, silverware, jewellery, ornaments, works of art or other valuables.",
  "The Operator shall not be liable for losses, damages or expenses arising from delay or consequential losses, including loss arising from the passenger’s fault, acts or omissions of unrelated third parties, or unusual/unforeseeable circumstances outside the Operator’s control.",
  "Sailing schedules may be interrupted, changed or extended due to adverse weather or operational circumstances beyond the Operator’s control. The Operator is not liable for costs or inconvenience caused by such delays, though it will do its best to advise passengers.",
  "The Operator cannot accept liability for costs or inconvenience caused by delays in the passenger’s arrival at the terminal.",
  "Passengers whose luggage is damaged during the journey must notify the Operator in writing: apparent cabin luggage damage before or at disembarkation; apparent freight damage at delivery; and non-apparent damage within 24 hours from disembarkation.",
  "Any cause of action or claim arising out of or relating to these terms or the services must be commenced as soon as the incident has occurred and/or before the passenger exits the terminal facility or vessel, otherwise the claim may be barred.",
];

const accessibilityTerms = [
  "Passengers requiring special assistance due to disability before, during or after the trip must notify the Operator at the time of booking and at least 48 hours before departure.",
  "If such notification is not provided, the Operator cannot guarantee embarkation and may in some cases refuse boarding.",
  "Disabled persons and persons with reduced mobility who request special assistance must arrive at the point and time designated by the Operator in writing, at the latest 60 minutes before embarkation or departure where no embarkation time is stipulated.",
];

const commercialAndDataTerms = [
  "Users are deemed to have read, understood and accepted these terms and conditions and all rights and liabilities with respect to any service are restricted to their scope.",
  "The Operator reserves the right, in its sole discretion, to terminate access to its website, sales channels and related services at any time without notice for general maintenance or any other reason.",
  "The Operator may charge transaction fees and alter any and all fees from time to time without notice. Users remain responsible for all charges, fees, duties, taxes and assessments arising out of use of the services.",
  "In case of a short charge because of technical or other reasons, the Operator reserves the right to recover the balance subsequently.",
  "In the event of a major increase in fuel costs, a surcharge may be payable for fuel price adjustment and may be collected at boarding or at the time of booking.",
  "Where a reservation does not get confirmed, the Operator will process the refund and is under no obligation to make another booking in lieu of or compensate for the unconfirmed booking.",
  "Any information specifically mentioned by the Operator as confidential shall be maintained confidential by the user unless disclosure is required by law or necessary to serve the purpose of these terms.",
  "The Operator may send booking confirmations, cancellations, payment confirmations, booking status, schedule changes and other relevant information via SMS, email, voice call, WhatsApp or other digital means. By using the services, the user consents to such transactional communications.",
  "The Operator is only responsible for transactions done by the user through the Operator. The user must comply with all applicable laws, be of legal age to enter into a binding contract and not be barred from availing the services under law.",
  "Users may register accounts on the Operator’s website and may be required to provide personal information. Users are responsible for maintaining accurate account details and for all activity under their account.",
  "When a user creates a booking as a guest, the system automatically creates a customer profile and assigns a customer ID. The user is deemed logged into the website/application until they choose to log out.",
  "The website uses cookies and similar technologies. If users block cookies, some portions of the website may not function properly.",
  "The Operator’s website may contain third-party links, advertising and promotional content. Such sites are not controlled by the Operator and use of such hyperlinks and content is at the user’s own risk.",
  "The Operator collects, stores and uses personal information in accordance with its privacy policy for service delivery, fraud prevention, communication, internal analysis and related purposes.",
  "The Operator does not trade, sell or transfer user personal information except as specified in the terms, and may disclose personal information if required by law or reasonably necessary to protect rights, property or personal safety.",
  "Users download material from the website at their own discretion and risk, though the Operator uses best endeavours to ensure content is free of viruses and malware.",
  "Users expressly authorise the Operator to contact them with offers and feedback-related communications through direct mailers, emailers, telephone calls, SMS or any other medium until 365 days from registration, unless they specifically opt out by writing to support@m2mferries.com.",
];

const generalLegalTerms = [
  "The Operator may provide content protected by copyright, trademarks or other intellectual property rights. Users may use such material only as expressly authorised by the Operator and may not copy, transmit, distribute or create derivative works without permission.",
  "Unless otherwise specified, the Operator’s services are for the user’s personal and non-commercial use.",
  "The user agrees to indemnify, defend and hold harmless the Operator and/or its affiliates from losses, liabilities, claims, damages, costs and expenses arising from the user’s breach or non-performance of these terms.",
  "The Operator reserves the right not to accept any user order without assigning any reason. No contract to provide any service is complete until full payment is received and accepted by the Operator.",
  "The Operator may cancel bookings or suspend/terminate user registration where information is false, unverifiable, suspected to be fraudulent, or where the user is in breach of these terms or applicable law.",
  "The user expressly agrees that use of the services is at their sole risk. The Operator may change features or functionality at any time without notice and expressly disclaims all warranties except those expressly made herein.",
  "These terms include provisions on interpretation, severability, headings, relationship between parties, updating of information by the Operator, and modification of these terms and conditions by the Operator from time to time.",
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
    <section className="rounded-[18px] bg-white/55 p-5 shadow-[0_10px_24px_rgba(7,20,39,0.06)] md:p-7">
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

function PolicyTable() {
  return (
    <div className="mt-5 overflow-x-auto rounded-[14px] border border-[#D6DEE6] bg-white">
      <table className="min-w-[980px] w-full border-collapse text-left text-[13px] text-[#1B2B48]">
        <thead className="bg-[#EAF4FA] text-[#0A2342]">
          <tr>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Time Prior to Departure</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kylaq Zone Refund</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kylaq Zone Date / Time Modification</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kushaq Zone / Deck / Slavia Lounge Refund</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kushaq Zone / Deck / Slavia Lounge Date / Time Modification</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kodiaq Lounge Refund</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Skoda Kodiaq Lounge Date / Time Modification</th>
          </tr>
        </thead>
        <tbody>
          {cancellationRows.map((row) => (
            <tr key={row.time} className="align-top">
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

function BaggageTable() {
  return (
    <div className="mt-5 overflow-x-auto rounded-[14px] border border-[#D6DEE6] bg-white">
      <table className="min-w-[520px] w-full border-collapse text-left text-[13px] text-[#1B2B48]">
        <thead className="bg-[#EAF4FA] text-[#0A2342]">
          <tr>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Seating Category</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Bags Allowed</th>
            <th className="border-b border-[#D6DEE6] px-4 py-3 font-semibold">Weight Limit</th>
          </tr>
        </thead>
        <tbody>
          {baggageRows.map((row) => (
            <tr key={row.category}>
              <td className="border-b border-[#E3EAF0] px-4 py-3 font-medium">{row.category}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.bags}</td>
              <td className="border-b border-[#E3EAF0] px-4 py-3">{row.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TermsContentSection() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,rgba(148,212,255,0.25)_0%,#FFFFFF_100%)]">
      <section className="mx-auto max-w-[1450px] px-4 pt-14 pb-8 md:px-10 md:pt-25 md:pb-12">
        <div className="space-y-6">
          <SectionBlock
            title="Terms And Conditions For M2M Ferries Ro-Pax Service"
            paragraphs={introductoryParagraphs}
          />

          <SectionBlock title="Route And Vessel Specific Conditions" bullets={routeConditions} />

          <SectionBlock title="Additional Terms And Conditions" bullets={additionalTerms} />

          <SectionBlock
            title="Modification And Cancellation Policy"
            bullets={modificationPolicy}
          >
            <PolicyTable />
          </SectionBlock>

          <SectionBlock title="Baggage Allowance" bullets={baggagePolicy}>
            <BaggageTable />
          </SectionBlock>

          <SectionBlock
            title="Short & Long Distance Voyages, Safety And Security"
            bullets={safetySecurity}
          />

          <SectionBlock title="Liability, Claims And Limitation Periods" bullets={liabilityClaims} />

          <SectionBlock
            title="Disabled Persons & Persons With Reduced Mobility"
            bullets={accessibilityTerms}
          />

          <SectionBlock
            title="User Responsibility, Fees, Communications And Data"
            bullets={commercialAndDataTerms}
          />

          <SectionBlock
            title="Insurance, Force Majeure, Proprietary Rights And General Legal Terms"
            bullets={generalLegalTerms}
          />
        </div>
      </section>
    </main>
  );
}
