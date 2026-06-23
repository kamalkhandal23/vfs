import { useState } from "react";
import img from "../assets/images/vfs-hero-section/vfs3.jpg";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = ["all", "school", "events", "sports", "karate"];

  const images = [
    { src: img, category: "school" },
    { src: img, category: "events" },
    { src: img, category: "sports" },
    { src: img, category: "karate" },
    { src: img, category: "events" },
    { src: img, category: "school" },
    { src: img, category: "sports" },
    { src: img, category: "karate" },
    { src: img, category: "events" },
    { src: img, category: "school" },
  ];

  const filtered =
    activeTab === "all"
      ? images
      : images.filter((img) => img.category === activeTab);

  return (
    <div className="bg-[#F4F8FB] min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white py-16 text-center">
        <h1 className="text-[32px] md:text-[48px] font-semibold">
          School Gallery
        </h1>
        <p className="mt-3 text-white/80">
          Moments of Learning, Growth & Achievement
        </p>
      </section>

      {/* ================= FILTER ================= */}
      <section className="py-10 px-4 md:px-6 max-w-[1100px] mx-auto text-center">

        <div className="flex flex-wrap justify-center gap-3">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === cat
                  ? "bg-[#0A2342] text-white"
                  : "bg-white text-[#0A2342] shadow"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}

        </div>

      </section>

      {/* ================= GRID ================= */}
      <section className="px-4 md:px-6 pb-16 max-w-[1200px] mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filtered.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition group"
            >
              <img
                src={item.src}
                alt=""
                className="w-full h-[180px] object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}