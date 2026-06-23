import { useMemo, useRef } from "react";
import img1 from "../../assets/images/vfs-hero-section/vfs1.jpg";
import img2 from "../../assets/images/vfs-hero-section/vfs1.jpg";
import img3 from "../../assets/images/vfs-hero-section/vfs1.jpg";
import img4 from "../../assets/images/vfs-hero-section/vfs1.jpg";
import img5 from "../../assets/images/vfs-hero-section/vfs1.jpg";

const UPDATES = [
  {
    id: "1",
    image: img1,
    title: "Admit Card Released",
    desc: "Students can collect their admit cards from the school office.",
    link: "/admit-card",
  },
  {
    id: "2",
    image: img2,
    title: "Admissions Open 2026-27",
    desc: "Enroll now for limited seats from Nursery to Class 12.",
    link: "/admissions",
  },
  {
    id: "3",
    image: img3,
    title: "Annual Function 2026",
    desc: "Join us for cultural performances and celebrations.",
    link: "/events",
  },
  {
    id: "4",
    image: img4,
    title: "Unit Test Schedule",
    desc: "Check upcoming exam dates and prepare accordingly.",
    link: "/results",
  },
  {
    id: "5",
    image: img5,
    title: "Summer Vacation Notice",
    desc: "School will remain closed from 25 May to 10 June.",
    link: "/notice",
  },
];

function UpdateCard({ card }) {
  return (
    <article className="flex h-[300px] flex-col rounded-[10px] bg-white p-[10px] shadow-md">

      <img
        src={card.image}
        alt={card.title}
        className="h-[160px] w-full object-cover rounded-md"
      />

      <div className="flex flex-col flex-1 pt-2">
        <h3 className="text-[15px] font-semibold text-[#0A2342]">
          {card.title}
        </h3>

        <p className="text-[13px] text-gray-600 mt-1 line-clamp-2">
          {card.desc}
        </p>

        <button
          onClick={() => window.location.href = card.link}
          className="mt-auto bg-[#0A2342] text-white text-[12px] py-2 rounded-md hover:bg-[#123A6B]"
        >
          View Details
        </button>
      </div>
    </article>
  );
}

export default function ImportantUpdatesSection() {
  const sliderRef = useRef(null);

  const handleMouseEnter = () => {
    sliderRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    sliderRef.current.style.animationPlayState = "running";
  };

  const displayItems = useMemo(() => UPDATES, []);

  return (
    <section className="relative overflow-hidden py-16 bg-[#0A2342]">

      {/* HEADING */}
      <h2 className="text-center text-[26px] md:text-[34px] font-semibold text-white">
        Important Updates & Announcements
      </h2>

      {/* SLIDER */}
      <div className="mt-10 overflow-hidden px-4">
        <div
          ref={sliderRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex w-max gap-4 animate-slider"
        >
          {[...displayItems, ...displayItems].map((card, index) => (
            <div key={index} className="w-[280px] md:w-[320px] flex-shrink-0">
              <UpdateCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}