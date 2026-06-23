import teacherImg from "../assets/images/vfs-hero-section/vfs3.jpg";

export default function FacultyPage() {

  const facultyData = [
    { name: "Amit Sharma", class: "12th", subject: "Physics", experience: "12 Years", img: teacherImg },
    { name: "Neha Verma", class: "12th", subject: "Biology", experience: "10 Years", img: teacherImg },

    { name: "Rohit Jain", class: "11th", subject: "Mathematics", experience: "9 Years", img: teacherImg },
    { name: "Pooja Singh", class: "11th", subject: "Chemistry", experience: "8 Years", img: teacherImg },

    { name: "Ankit Gupta", class: "10th", subject: "Science", experience: "7 Years", img: teacherImg },
    { name: "Sneha Mehta", class: "10th", subject: "English", experience: "6 Years", img: teacherImg },

    { name: "Rahul Yadav", class: "9th", subject: "Mathematics", experience: "6 Years", img: teacherImg },
    { name: "Priya Sharma", class: "9th", subject: "Social Science", experience: "5 Years", img: teacherImg },

    { name: "Karan Patel", class: "8th", subject: "Science", experience: "5 Years", img: teacherImg },
    { name: "Riya Kapoor", class: "8th", subject: "English", experience: "4 Years", img: teacherImg },

    { name: "Deepak Joshi", class: "7th", subject: "Maths", experience: "4 Years", img: teacherImg },
    { name: "Anjali Verma", class: "6th", subject: "EVS", experience: "3 Years", img: teacherImg },

    { name: "Suman Devi", class: "5th", subject: "All Subjects", experience: "5 Years", img: teacherImg },
    { name: "Meena Kumari", class: "3rd", subject: "Primary", experience: "4 Years", img: teacherImg },

    { name: "Kavita Sharma", class: "Nursery", subject: "Early Learning", experience: "6 Years", img: teacherImg },
  ];

  return (
    <div className="bg-[#F4F8FB] min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white py-16 text-center">
        <h1 className="text-[32px] md:text-[48px] font-semibold">
          Our Faculty
        </h1>
        <p className="mt-3 text-white/80">
          Experienced & Dedicated Teaching Team
        </p>
      </section>

      {/* ================= GRID ================= */}
      <section className="px-4 md:px-6 py-16 max-w-[1200px] mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {facultyData.map((teacher, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition hover:-translate-y-1"
            >

              {/* IMAGE */}
              <img
                src={teacher.img}
                alt={teacher.name}
                className="w-full h-[180px] object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 text-center">

                <h3 className="text-[15px] font-semibold text-[#0A2342]">
                  {teacher.name}
                </h3>

                <p className="text-xs text-[#00CFC8] mt-1 font-medium">
                  Class {teacher.class}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {teacher.subject}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {teacher.experience} Experience
                </p>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}