import { Clock3, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import ThankYouPopup from "../components/ui/ThankYouPopup";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-[#D9E4EF] bg-[#F8FBFE] px-4 py-3 text-sm text-[#0A2342] outline-none transition placeholder:text-[#90A0B2] focus:border-[#0A2342] focus:bg-white";

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7E95]";

export default function Contact() {
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    queryType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.queryType) newErrors.queryType = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log(formData);
    setShowPopup(true);

    setFormData({
      name: "",
      phone: "",
      queryType: "",
      message: "",
    });
  };

  const queryTypeOptions = [
    "Admission Enquiry",
    "Fee Structure",
    "NEEV Batch",
    "Transport Enquiry",
    "General Enquiry",
  ];

  const [activeQueryType, setActiveQueryType] = useState(
    queryTypeOptions[0]
  );

  const contactDetails = [
    {
      icon: Phone,
      label: "Call us",
      value: "+91 9001700414",
      note: "Weekdays 9:00 AM - 4:00 PM",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@vrindafoundation.com",
      note: "We usually respond within one working day",
    },
    {
      icon: MapPin,
      label: "Visit",
      value: "Sujangarh Road, Jaswantgarh",
      note: "Rajasthan 341304",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F4F8FB] py-12 pt-20 md:py-16 md:pt-28">
      <div className="absolute inset-x-0 top-0 h-64 ]" />

      <div className="relative mx-auto max-w-[1180px] px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CEE0F1] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0A2342] shadow-[0_8px_24px_rgba(15,45,58,0.06)]">
            <Sparkles size={14} className="text-[#137DC5]" />
            Reach out
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#0A2342] md:text-5xl">
            Contact Vrinda Foundation School
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#51667E] md:text-lg">
            We’re here to help with admissions, school details, and general
            queries. Share a message and our team will get back to you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT PANEL */}
          <aside className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#0A2342_0%,#0D345D_55%,#12497B_100%)] p-8 text-white shadow-[0_22px_60px_rgba(10,35,66,0.18)] md:p-10">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-[#00CFC8]/20 blur-2xl" />

            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65">
                Contact details
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight">
                Let&apos;s make it easy to connect.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/78">
                If you need help with admission queries, fee information, or
                school-related support, we&apos;re just a call or message away.
              </p>

              <div className="mt-8 grid gap-4">
                {contactDetails.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-white">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/70">
                          {item.note}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/12 bg-white/8 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Clock3 size={16} />
                  School office hours
                </div>
                <p className="mt-2 text-sm leading-6 text-white/76">
                  Monday to Saturday, 9:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT FORM */}
          <div className="rounded-[28px] border border-[#D9E4EF] bg-white p-6 shadow-[0_22px_60px_rgba(15,45,58,0.08)] md:p-10">
            <div className="flex flex-col gap-2 border-b border-[#E6EDF4] pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6B7E95]">
                  Send us a message
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#0A2342]">
                  We’ll reply with the right next step
                </h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#60748D]">
                Share the details below and we’ll route your message to the
                right team.
              </p>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={fieldClass}
                />
                {errors.name && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className={fieldClass}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className={labelClass}>Query Type</label>
              <div className="mt-3 flex flex-wrap gap-3">
                {queryTypeOptions.map((opt) => {
                  const selected = activeQueryType === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setActiveQueryType(opt);
                        setFormData({ ...formData, queryType: opt });
                        setErrors({ ...errors, queryType: "" });
                      }}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                        selected
                          ? "border-[#0A2342] bg-[#0A2342] text-white shadow-[0_10px_24px_rgba(10,35,66,0.18)]"
                          : "border-[#D9E4EF] bg-[#F8FBFE] text-[#0A2342] hover:border-[#9DB6D1] hover:bg-white"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {errors.queryType && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.queryType}
                </p>
              )}
            </div>

            <div className="mt-6">
              <label className={labelClass}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows={6}
                className={`${fieldClass} min-h-[180px] resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-xs font-medium text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#60748D]">
                We respect your privacy and only use the details to respond to
                your query.
              </p>
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-full bg-[#0A2342] px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(10,35,66,0.2)] transition hover:-translate-y-0.5 hover:bg-[#12355D]"
              >
                Submit Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <ThankYouPopup onClose={() => setShowPopup(false)} />
      )}
    </section>
  );
}
