import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import ThankYouPopup from "../components/ui/ThankYouPopup";

const underlineInputClass =
  "w-full border-0 border-b border-[#D6DEE6] bg-transparent px-0 py-2 text-[13px] text-[#0A2342] outline-none placeholder:text-[#9AA7B6] focus:border-[#0A2342]";

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

  return (
    <section className="bg-[#F4F8FB] py-12 md:py-25">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">

        <div className="grid overflow-hidden rounded-[16px] bg-white shadow-md md:grid-cols-[0.45fr_0.55fr]">

          {/* LEFT PANEL */}
          <aside className="bg-[#0A2342] px-8 py-10 text-white">

            <h2 className="text-[22px] md:text-[26px] font-semibold">
              Contact Vrinda Foundation School
            </h2>

            <p className="mt-2 text-sm text-white/80">
              We are here to help you with admissions and queries.
            </p>

            <div className="mt-8 space-y-6 text-sm">

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <p>+91 9001700414</p>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                <p>info@vrindafoundation.com</p>
              </div>

              <p className="text-white/70 text-xs mt-4">
                Sujangarh Road, Jaswantgarh, Rajasthan
              </p>

            </div>

          </aside>

          {/* RIGHT FORM */}
          <div className="px-6 py-8 md:px-10">

            <h3 className="text-[18px] font-semibold text-[#0A2342]">
              Send Us a Message
            </h3>

            {/* INPUTS */}
            <div className="mt-5 grid md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={underlineInputClass}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className={underlineInputClass}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

            </div>

            {/* QUERY TYPE */}
            <div className="mt-6">
              <label className="text-sm font-medium">Query Type</label>

              <div className="mt-3 flex flex-wrap gap-4">
                {queryTypeOptions.map((opt, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={activeQueryType === opt}
                      onChange={() => {
                        setActiveQueryType(opt);
                        setFormData({ ...formData, queryType: opt });
                        setErrors({ ...errors, queryType: "" });
                      }}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              {errors.queryType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.queryType}
                </p>
              )}
            </div>

            {/* MESSAGE */}
            <div className="mt-6">
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full border-b mt-2 outline-none text-sm"
              />
              {errors.message && (
                <p className="text-red-500 text-xs">{errors.message}</p>
              )}
            </div>

            {/* BUTTON */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-[#0A2342] text-white px-6 py-2 rounded-md hover:scale-105 transition"
              >
                Submit
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