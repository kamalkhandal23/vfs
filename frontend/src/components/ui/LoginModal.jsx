import { useEffect, useState } from "react";
import { X, User, GraduationCap } from "lucide-react";

export default function LoginModal({ isOpen, onClose }) {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setForm({ id: "", password: "" });
    }
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">

      {/* BACKDROP */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 transition ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* PANEL */}
      <div
        className={`relative w-full md:w-[380px] bg-white h-full shadow-xl transform transition ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#0A2342]">
            School Login
          </h2>

          <button onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* ROLE SWITCH */}
        <div className="flex m-4 rounded-full bg-gray-100 p-1">

          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-full text-sm flex items-center justify-center gap-2 ${
              role === "student"
                ? "bg-[#0A2342] text-white"
                : "text-gray-600"
            }`}
          >
            <GraduationCap size={16} />
            Student
          </button>

          <button
            onClick={() => setRole("faculty")}
            className={`flex-1 py-2 rounded-full text-sm flex items-center justify-center gap-2 ${
              role === "faculty"
                ? "bg-[#0A2342] text-white"
                : "text-gray-600"
            }`}
          >
            <User size={16} />
            Faculty
          </button>

        </div>

        {/* FORM */}
        <div className="px-5 mt-4">

          <label className="text-sm font-medium">
            {role === "student" ? "Student ID" : "Faculty ID"}
          </label>

          <input
            value={form.id}
            onChange={(e) =>
              setForm({ ...form, id: e.target.value })
            }
            placeholder={
              role === "student" ? "Enter Student ID" : "Enter Faculty ID"
            }
            className="mt-2 w-full border px-3 py-2 rounded-md outline-none"
          />

          <label className="text-sm font-medium mt-4 block">
            Password
          </label>

          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            placeholder="Enter password"
            className="mt-2 w-full border px-3 py-2 rounded-md outline-none"
          />

          {/* LOGIN BUTTON */}
          <button className="mt-6 w-full bg-[#0A2342] text-white py-3 rounded-md hover:scale-105 transition">
            Login
          </button>

          {/* FUTURE INFO */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Login portal for students and faculty (coming soon)
          </p>

        </div>

      </div>
    </div>
  );
}