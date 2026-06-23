import { useState } from "react";
import { X, User, Phone, BookOpen, MessageSquare } from "lucide-react";

export default function AdmissionFormModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    class: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({ name: "", phone: "", class: "", message: "" });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-[fadeIn_0.3s_ease]">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <X size={20} />
        </button>

        {/* SUCCESS STATE */}
        {submitted ? (
          <div className="text-center py-10">
            <div className="text-green-600 text-3xl">✔</div>
            <h3 className="mt-3 text-lg font-semibold text-[#0A2342]">
              Application Submitted!
            </h3>
            <p className="text-sm mt-2 text-gray-500">
              We will contact you shortly
            </p>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <h2 className="text-xl md:text-2xl font-semibold text-[#0A2342] text-center">
              Apply for Admission
            </h2>

            <p className="text-center text-sm text-gray-500 mt-1">
              Fill details and we’ll contact you
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              {/* NAME */}
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#00CFC8]">
                <User size={16} className="text-gray-400 mr-2" />
                <input
                  placeholder="Student Name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* PHONE */}
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#00CFC8]">
                <Phone size={16} className="text-gray-400 mr-2" />
                <input
                  placeholder="Phone Number"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* CLASS */}
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#00CFC8]">
                <BookOpen size={16} className="text-gray-400 mr-2" />
                <input
                  placeholder="Class (e.g. 6th, 10th)"
                  required
                  value={form.class}
                  onChange={(e) =>
                    setForm({ ...form, class: e.target.value })
                  }
                  className="w-full outline-none text-sm"
                />
              </div>

              {/* MESSAGE */}
              <div className="flex items-start border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#00CFC8]">
                <MessageSquare size={16} className="text-gray-400 mr-2 mt-1" />
                <textarea
                  placeholder="Message (optional)"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full outline-none text-sm resize-none"
                  rows={3}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0A2342] to-[#137DC5] text-white py-3 rounded-lg font-medium hover:scale-[1.02] transition"
              >
                Submit Application
              </button>

            </form>
          </>
        )}
      </div>

      {/* ANIMATION STYLE */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}