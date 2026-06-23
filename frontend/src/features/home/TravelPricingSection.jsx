import bgWave from "../../assets/styles/Vector-12.png";
import mainImage from "../../assets/images/vfs-hero-section/vfs3.jpg";

export default function SchoolNotificationSection() {

  const notifications = [
    {
      title: "Admit Card Released",
      date: "15 May 2026",
      desc: "Students can download their admit cards from the school office or portal.",
      important: true
    },
    {
      title: "Summer Vacation",
      date: "25 May – 10 June",
      desc: "School will remain closed for summer holidays."
    },
    {
      title: "Unit Test Exams",
      date: "Starts from 20 April",
      desc: "Prepare well. Date sheet available on notice board."
    },
    {
      title: "Parent-Teacher Meeting",
      date: "28 April",
      desc: "PTM scheduled for all classes. Attendance is mandatory."
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F8FB] py-8 md:py-16">
      
      {/* Background Wave */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-cover bg-bottom bg-no-repeat md:block opacity-80"
        style={{ backgroundImage: `url(${bgWave})` }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-4 md:px-6">

        {/* HEADING */}
        <div className="mb-6 md:mb-10 text-left md:text-center">
          <h2 className="text-xl font-bold text-[#0A2342] md:text-3xl">
            Latest Notifications
          </h2>
          <p className="mt-1 text-sm text-[#64748B] md:text-base">
            Stay updated with all important school announcements
          </p>
        </div>

        {/* NOTIFICATIONS GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {notifications.map((item, index) => (
            <NotificationCard key={index} item={item} />
          ))}
        </div>

        {/* IMAGE */}
        <div className="mt-8 flex justify-center md:mt-12">
          <img
            src={mainImage}
            alt="Vrinda Foundation School"
            className="w-full max-w-[900px] rounded-2xl object-cover shadow-md transition hover:scale-[1.01] md:rounded-[18px] md:shadow-lg"
          />
        </div>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-5 max-w-[720px] text-sm text-[#475E75] md:mt-6 md:text-center md:text-[15px] leading-relaxed">
          Stay connected with Vrinda Foundation School for the latest updates on exams, holidays, and academic activities. We ensure timely communication for a better learning experience.
        </p>
      </div>
    </section>
  );
}


/* ================= COMPONENT ================= */

function NotificationCard({ item }) {
  return (
    <div className="group relative rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
      
      {/* IMPORTANT TAG */}
      {item.important && (
        <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-[2px] text-[10px] font-semibold text-white">
          NEW
        </span>
      )}

      {/* TITLE */}
      <h3 className="text-[15px] font-semibold text-[#0A2342] md:text-[17px] group-hover:text-primary transition">
        {item.title}
      </h3>

      {/* DATE */}
      <p className="mt-1 text-xs font-medium text-primary md:text-sm">
        {item.date}
      </p>

      {/* DESCRIPTION */}
      <p className="mt-2 text-[12px] text-[#64748B] md:text-[14px] leading-relaxed">
        {item.desc}
      </p>

      {/* HOVER LINE EFFECT */}
      <div className="mt-3 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
    </div>
  );
}