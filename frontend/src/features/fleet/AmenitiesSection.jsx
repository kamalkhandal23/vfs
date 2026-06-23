import {
  BookOpen,
  Laptop,
  FlaskConical,
  Dumbbell,
  Bus,
  Library,
} from "lucide-react";
import { useState } from "react";

import classroom from "../../assets/images/vfs-hero-section/vfs3.jpg";
import computer from "../../assets/images/vfs-hero-section/vfs3.jpg";
import sports from "../../assets/images/vfs-hero-section/vfs3.jpg";
import libraryImg from "../../assets/images/vfs-hero-section/vfs3.jpg";
import transport from "../../assets/images/vfs-hero-section/vfs3.jpg";
import lab from "../../assets/images/vfs-hero-section/vfs3.jpg";
const TABS = [
  { key: "junior", label: "Junior Wing" },
  { key: "middle", label: "Middle Wing" },
  { key: "senior", label: "Senior Wing" },
];

export default function FacilitiesSection() {
  const [active, setActive] = useState("Smart Classrooms");
  const [tab, setTab] = useState("middle");

  const menus = [
    { key: "Smart Classrooms", icon: BookOpen, img: classroom },
    { key: "Science Lab", icon: FlaskConical, img: lab },
    { key: "Computer Lab", icon: Laptop, img: computer },
    { key: "Sports", icon: Dumbbell, img: sports },
    { key: "Library", icon: Library, img: libraryImg },
    { key: "Transport", icon: Bus, img: transport },
  ];

  const current = menus.find((m) => m.key === active);

  return (
    <section className="bg-[#F4F8FB] py-16 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">

        {/* TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-[28px] md:text-[36px] font-semibold text-[#0A2342]">
            Explore Our Facilities
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Providing modern infrastructure for better learning experience
          </p>
        </div>

        <div className="grid md:grid-cols-[240px_1fr] gap-8">

          {/* LEFT MENU */}
          <div className="flex flex-col gap-3">
            {menus.map(({ key, icon: Icon }) => {
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-[#0A2342] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  {key}
                </button>
              );
            })}
          </div>

          {/* RIGHT CONTENT */}
          <div>

            {/* TABS */}
            <div className="flex gap-6 mb-4">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`border-b-2 pb-1 ${
                    tab === t.key
                      ? "border-[#0A2342] text-[#0A2342]"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* IMAGE */}
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={current.img}
                className="w-full h-[380px] object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <h3 className="text-white text-lg font-semibold">
                  {current.key}
                </h3>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 text-sm text-gray-600">
              Our {current.key.toLowerCase()} are designed to provide students with
              the best environment for learning, development, and growth.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}