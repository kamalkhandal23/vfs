import { X, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

import topBg from "../../../assets/styles/contact-bg.svg";
import fallbackAvatar from "../../../assets/icons/user2.png";
import logo from "../../../assets/logo/vfs-logo.png";

/* ===== MENU CONFIG ===== */
const MENU = [
  { label: "HOME", path: "/" },
  { label: "ADMISSION", path: "/admissions" },
  { label: "ACADEMICS", path: "/fleet" },
  { label: "FAQ", path: "/faq" },
  { label: "CONTACT US", path: "/contact" },
];

export default function MobileSidebar({
  isOpen,
  onClose,
  user,
  onAuthAction,
  onLogout,
}) {
  const isLoggedIn = !!user;

  return (
    <>
      {/* ===== OVERLAY ===== */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ===== SIDEBAR ===== */}
      <div
        className={`fixed top-0 left-0 w-[85%] max-w-[360px] h-full bg-[#ffffff] z-50 transform transition duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ===== TOP HEADER ===== */}
        <div
          className="relative h-[130px] px-5 pt-4"
          style={{
            backgroundImage: `url(${topBg})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
          >
            <X size={16} />
          </button>

          {/* USER / LOGO */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3 mt-6">
              <img
                src={user?.avatar || fallbackAvatar}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <div>
                <p className="text-white font-semibold text-[14px]">
                  {user?.name || "User"}
                </p>
                <p className="text-white text-[11px] opacity-90">
                  {user?.phone || "+91 XXXXX XXXXX"}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-1 ">
              <img src={logo} alt="logo" className="h-18" />
            </div>
          )}
        </div>

        {/* ===== MENU ===== */}
        <div className="px-5 mt-5">
          <div className="bg-white rounded-[10px] overflow-hidden border-[#E6E6E6]">
            {MENU.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex justify-between items-center px-4 py-3 border-b border-[#E6E6E6] last:border-none transition ${
                    isActive ? "bg-[#e6f0f8]" : "hover:bg-gray-50"
                  }`
                }
              >
                <span className="text-[13px] font-semibold text-[#0A2342]">
                  {item.label}
                </span>
                <ChevronRight size={16} />
              </NavLink>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM BUTTON ===== */}
        <div className="absolute bottom-10 left-0 w-full px-5">
          <button
            onClick={isLoggedIn ? onLogout : onAuthAction}
            className="w-full bg-[#0A2342] text-white py-3 rounded-[10px] text-[14px] font-semibold transition hover:scale-[1.02] active:scale-[0.95]"
          >
            {isLoggedIn ? "SIGN OUT" : "SIGN UP"}
          </button>

          <p className="text-center text-[10px] text-gray-400 mt-3">
            App Version <br /> 1.0.0
          </p>
        </div>
      </div>
    </>
  );
}
