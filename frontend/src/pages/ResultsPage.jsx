import { useState } from "react";

export default function ResultsPage() {
  const [year, setYear] = useState("2026");
  const [classType, setClassType] = useState("10th");

  // ✅ Dummy Images (replace later)
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

  return (
    <div className="bg-[#F4F8FB] min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white py-16 text-center">
        <h1 className="text-[32px] md:text-[48px] font-semibold">
          Academic Results
        </h1>
        <p className="mt-3 text-white/80">
          Celebrating Our Students’ Achievements
        </p>
      </section>

      {/* ================= FILTER ================= */}
      <section className="py-10 px-4 md:px-6 max-w-[1100px] mx-auto">

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

          {/* YEAR */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-2 rounded-md border"
          >
            {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* CLASS */}
          <div className="flex bg-white rounded-full shadow p-1">
            {["10th", "12th"].map((c) => (
              <button
                key={c}
                onClick={() => setClassType(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  classType === c
                    ? "bg-[#0A2342] text-white"
                    : "text-[#0A2342]"
                }`}
              >
                Class {c}
              </button>
            ))}
          </div>

        </div>

      </section>

      {/* ================= CARDS ================= */}
      <section className="px-4 md:px-6 pb-16 max-w-[1100px] mx-auto">

        {data.length === 0 ? (
          <p className="text-center text-gray-500">
            No data available for this year
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {data.map((student, index) => (
              <div
                key={index}
                className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >

                {/* TOPPER STRIP */}
                {index === 0 && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-3 py-1 rounded-br-lg">
                    Topper
                  </div>
                )}

                {/* IMAGE */}
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-[180px] object-cover"
                />

                {/* CONTENT */}
                <div className="p-4 text-center">

                  <h3 className="text-[15px] font-semibold text-[#0A2342]">
                    {student.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {student.percentage}%
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}