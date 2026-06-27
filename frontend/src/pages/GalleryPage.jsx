import { useState } from "react";
import { Sparkles } from "lucide-react";
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

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = cat === "all" ? images.length : images.filter((img) => img.category === cat).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F4F8FB]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071A33] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-6rem] top-[-5rem] h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute right-[-4rem] top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#0A2342]" />
        </div>

        <div className="relative mx-auto max-w-[1180px] px-4 py-16 pt-20 md:px-6 md:py-20 md:pt-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              <Sparkles size={14} />
              Campus stories
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              School Gallery
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              Moments of learning, growth, celebration, and achievement captured across classrooms,
              events, sports, and karate.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <section className="px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-[1180px] rounded-[32px] border border-[#D7E2EE] bg-white p-4 shadow-[0_20px_50px_rgba(10,35,66,0.06)] md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F718A]">
                Browse gallery
              </p>
              <p className="mt-2 text-sm text-[#0A2342]">
                Filter by category to explore different parts of school life.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeTab === cat
                      ? "bg-[#0A2342] text-white shadow-[0_12px_26px_rgba(10,35,66,0.18)]"
                      : "border border-[#D7E2EE] bg-[#F8FBFF] text-[#0A2342] hover:bg-white"
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">
                    {cat}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      activeTab === cat
                        ? "bg-white/10 text-white"
                        : "bg-[#EEF4FB] text-[#5F718A]"
                    }`}
                  >
                    {categoryCounts[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-4 pb-16 md:px-6 md:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F718A]">
                Featured moments
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A2342] md:text-3xl">
                {activeTab === "all" ? "All gallery moments" : activeTab.toUpperCase()}
              </h2>
            </div>

            <div className="rounded-full border border-[#D7E2EE] bg-white px-4 py-2 text-sm text-[#5F718A] shadow-[0_10px_26px_rgba(10,35,66,0.05)]">
              {filtered.length} photos shown
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item, index) => (
              <GalleryCard
                key={`${item.category}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryCard({ item, index }) {
  const isFeatured = index === 0 || index === 5;
  const isTall = index % 5 === 0;
  return (
    <article
      className={`group overflow-hidden rounded-[28px] border border-[#D7E2EE] bg-white shadow-[0_16px_40px_rgba(10,35,66,0.06)] transition-transform duration-200 hover:-translate-y-1 ${
        isTall ? "sm:row-span-2" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.src}
          alt="Gallery preview"
          className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
            isTall ? "h-[340px] sm:h-[420px]" : "h-[220px]"
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0A2342] shadow-lg backdrop-blur">
            {item.category}
          </span>
        </div>

        {isFeatured && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="rounded-2xl bg-[#071A33]/85 px-4 py-3 text-white backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Featured capture
              </p>
              <p className="mt-1 text-sm font-medium">
                A glimpse into {item.category} activities.
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
