import { useEffect, useRef, useState } from "react";
import { Award, CalendarDays, ChevronDown, Medal, TrendingUp, Users } from "lucide-react";

export default function ResultsPage() {
  const [year, setYear] = useState("2026");
  const [classType, setClassType] = useState("10th");
  const [isYearOpen, setIsYearOpen] = useState(false);
  const yearPickerRef = useRef(null);

  const img = "https://randomuser.me/api/portraits/men/32.jpg";

  const resultsData = {
    2026: {
      "10th": [
        { name: "Aman Sharma", percentage: 94, image: img },
        { name: "Riya Verma", percentage: 91, image: img },
        { name: "Karan Mehta", percentage: 88, image: img },
      ],
      "12th": [
        { name: "Sakshi Jain", percentage: 96, image: img },
        { name: "Rohit Singh", percentage: 92, image: img },
      ],
    },
    2025: {
      "10th": [
        { name: "Neha Gupta", percentage: 93, image: img },
        { name: "Arjun Yadav", percentage: 90, image: img },
      ],
      "12th": [
        { name: "Priya Sharma", percentage: 95, image: img },
      ],
    },
  };

  const data = resultsData[year]?.[classType] || [];

  const averageScore = data.length
    ? Math.round(data.reduce((sum, item) => sum + item.percentage, 0) / data.length)
    : 0;

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!yearPickerRef.current) return;
      if (!yearPickerRef.current.contains(event.target)) {
        setIsYearOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F8FB]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071A33] text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute right-[-4rem] top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0A2342]" />
        </div>

        <div className="relative mx-auto max-w-[1180px] px-4 py-16 pt-20 md:px-6 md:py-20 md:pt-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              Results showcase
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Academic Results
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              Celebrating student achievement with a clear, elegant results view that makes it easy
              to switch between years and classes.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <HeroStat icon={CalendarDays} label="Selected year" value={year} />
              <HeroStat icon={Users} label="Class view" value={`Class ${classType}`} />
              <HeroStat icon={TrendingUp} label="Average score" value={`${averageScore}%`} />
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto grid max-w-[1180px] gap-4 rounded-[32px] border border-[#D7E2EE] bg-white p-4 shadow-[0_20px_50px_rgba(10,35,66,0.06)] lg:grid-cols-[1fr_auto] lg:items-center lg:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F718A]">
                Filter results
              </p>
              <p className="mt-2 text-sm text-[#0A2342]">
                Pick a year and class to view top achievers.
              </p>
            </div>

            <div ref={yearPickerRef} className="relative inline-flex">
              <button
                type="button"
                onClick={() => setIsYearOpen((open) => !open)}
                className="inline-flex min-w-[140px] items-center justify-between gap-3 rounded-full border border-[#D7E2EE] bg-[#F8FBFF] px-4 py-3 text-sm font-semibold text-[#0A2342] shadow-[0_8px_20px_rgba(10,35,66,0.04)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A2342]/15"
                aria-haspopup="listbox"
                aria-expanded={isYearOpen}
              >
                <span>{year}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[#0A2342]/70 transition-transform duration-200 ${
                    isYearOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isYearOpen && (
                <div className="absolute left-0 top-[calc(100%+10px)] z-20 w-full overflow-hidden rounded-[22px] border border-[#D7E2EE] bg-white shadow-[0_20px_50px_rgba(10,35,66,0.14)]">
                  <div className="border-b border-[#E8EEF5] px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5F718A]">
                      Select year
                    </p>
                  </div>
                  <div className="custom-scroll max-h-64 overflow-auto p-2">
                    {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => {
                      const value = String(y);
                      const active = year === value;

                      return (
                        <button
                          key={y}
                          type="button"
                          onClick={() => {
                            setYear(value);
                            setIsYearOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                            active
                              ? "bg-[#0A2342] text-white"
                              : "text-[#0A2342] hover:bg-[#F8FBFF]"
                          }`}
                        >
                          <span>{y}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="inline-flex rounded-full border border-[#D7E2EE] bg-[#F8FBFF] p-1">
            {["10th", "12th"].map((c) => (
              <FilterPill
                key={c}
                active={classType === c}
                onClick={() => setClassType(c)}
              >
                Class {c}
              </FilterPill>
            ))}
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="px-4 pb-16 md:px-6 md:pb-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5F718A]">
                Student highlights
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A2342] md:text-3xl">
                {year} - Class {classType}
              </h2>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-[#D7E2EE] bg-white px-4 py-2 text-sm text-[#5F718A] shadow-[0_10px_26px_rgba(10,35,66,0.05)]">
              <Medal size={16} className="text-[#0A2342]" />
              {data.length} featured students
            </div>
          </div>

          {data.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-[#D7E2EE] bg-white px-6 py-16 text-center shadow-[0_16px_40px_rgba(10,35,66,0.05)]">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#F3F7FC] text-[#0A2342]">
                <Award size={22} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-[#0A2342]">
                No results available yet
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#5F718A]">
                Try another year or class to view the published achievers.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {data.map((student, index) => (
                <ResultCard
                  key={`${student.name}-${index}`}
                  student={student}
                  rank={index + 1}
                  isTopper={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function HeroStat({ icon, label, value }) {
  const StatIcon = icon;
  return (
    <div className="rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/10 text-white">
          <StatIcon size={16} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/55">{label}</p>
          <p className="mt-1 text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-[#0A2342] text-white shadow-[0_12px_26px_rgba(10,35,66,0.18)]"
          : "text-[#0A2342] hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ student, rank, isTopper }) {
  return (
    <article className="group overflow-hidden rounded-[30px] border border-[#D7E2EE] bg-white shadow-[0_16px_40px_rgba(10,35,66,0.06)] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative">
        <img
          src={student.image}
          alt={student.name}
          className="h-[260px] w-full object-cover"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          {isTopper && (
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              Topper
            </span>
          )}
          <span className="rounded-full bg-[#071A33]/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Rank {rank}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#071A33]/90 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#0A2342]">{student.name}</h3>
            <p className="mt-1 text-sm text-[#5F718A]">Academic achiever</p>
          </div>

          <div className="rounded-full bg-[#F3F7FC] px-3 py-1 text-sm font-semibold text-[#0A2342]">
            {student.percentage}%
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 rounded-full bg-[#E8EEF5]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#0A2342] to-[#137DC5]"
              style={{ width: `${student.percentage}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-[#5F718A]">
            Performance score
          </p>
        </div>
      </div>
    </article>
  );
}
