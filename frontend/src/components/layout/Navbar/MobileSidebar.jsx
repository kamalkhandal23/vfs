import {
  ArrowRight,
  ChevronRight,
  LogOut,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  UserCircle2,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import topBg from "../../../assets/styles/contact-bg.svg";
import fallbackAvatar from "../../../assets/icons/user2.png";
import logo from "../../../assets/logo/vfs-logo.png";

const FALLBACK_MENU = [
  { label: "HOME", path: "/" },
  { label: "ADMISSIONS", path: "/admissions" },
  { label: "ACADEMICS", path: "/fleet" },
  { label: "FAQ", path: "/faq" },
  { label: "CONTACT US", path: "/contact" },
  { label: "ABOUT US", path: "/about" },
];

export default function MobileSidebar({
  isOpen,
  onClose,
  side = "left",
  links,
  user,
  onAuthAction,
  onLogout,
}) {
  const isLoggedIn = !!user;
  const menuItems = Array.isArray(links) && links.length > 0 ? links : FALLBACK_MENU;
  const panelSideClass =
    side === "right" ? "right-0 translate-x-full" : "left-0 -translate-x-full";
  const openClass = side === "right" ? "translate-x-0" : "translate-x-0";

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
        className={`fixed top-0 ${side === "right" ? "right-0" : "left-0"} z-50 h-full w-[88%] max-w-[360px] transform overflow-hidden bg-[#F5F8FC] shadow-[0_28px_70px_rgba(7,28,61,0.3)] transition duration-300 ${
          isOpen ? openClass : panelSideClass
        }`}
      >
        <div className="flex h-full flex-col">
          {/* ===== TOP HEADER ===== */}
          <div
            className="relative px-5 pb-5 pt-5 text-white"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(10,35,66,0.98) 0%, rgba(10,35,66,0.94) 100%), url(${topBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            <div className="absolute inset-x-0 bottom-0 h-4 bg-[radial-gradient(circle_at_10px_-2px,transparent_8px,rgba(245,248,252,1)_9px)] bg-[length:22px_16px] bg-repeat-x opacity-95" />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0A2342] shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>

            <div className="relative pr-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
                  <img src={logo} alt="logo" className="h-10 w-auto" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/65">
                    Vrinda Foundation
                  </p>
                  <h2 className="mt-1 text-lg font-semibold leading-tight">
                    School menu
                  </h2>
                </div>
              </div>

            </div>
          </div>

          {/* ===== NAV AREA ===== */}
          <div className="flex-1 overflow-y-auto px-4 py-5 custom-scroll">
            <div className="rounded-[24px] border border-[#DCE6F1] bg-white p-3 shadow-[0_14px_32px_rgba(15,45,58,0.06)]">
              <div className="mb-3 flex items-center gap-2 px-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#6B7E95]">
                <Sparkles size={14} className="text-[#137DC5]" />
                Explore
              </div>

              <div className="space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-2xl px-3 py-3 transition ${
                        isActive
                          ? "bg-[#0A2342] text-white shadow-[0_12px_24px_rgba(10,35,66,0.16)]"
                          : "text-[#0A2342] hover:bg-[#F4F8FC]"
                      }`
                    }
                  >
                    <span className="text-sm font-semibold tracking-[0.02em]">
                      {item.label}
                    </span>
                    <ChevronRight size={15} className="opacity-70" />
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 rounded-[24px] border border-[#DCE6F1] bg-white p-4 shadow-[0_14px_32px_rgba(15,45,58,0.05)]">
              <div className="flex items-center gap-3 rounded-2xl bg-[#F6FAFE] p-3">
                {isLoggedIn ? (
                  <img
                    src={user?.avatar || fallbackAvatar}
                    alt="user"
                    className="h-11 w-11 rounded-2xl object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A2342] text-white">
                    <UserCircle2 size={18} />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7E95]">
                    {isLoggedIn ? "Signed in" : "Get started"}
                  </p>
                  <p className="truncate text-sm font-semibold text-[#0A2342]">
                    {isLoggedIn ? user?.name || "User" : "Open signup or login"}
                  </p>
                </div>
              </div>

              <button
                onClick={isLoggedIn ? onLogout : onAuthAction}
                className="flex items-center justify-center gap-2 rounded-full bg-[#0A2342] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12355D]"
              >
                {isLoggedIn ? <LogOut size={16} /> : <ArrowRight size={16} />}
                {isLoggedIn ? "Sign out" : "Sign up"}
              </button>

              <div className="grid grid-cols-2 gap-3 text-[#0A2342]">
                <div className="rounded-2xl bg-[#F6FAFE] p-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7E95]">
                    <Phone size={13} />
                    Call
                  </div>
                  <p className="mt-2 text-sm font-semibold">+91 9001700414</p>
                </div>
                <div className="rounded-2xl bg-[#F6FAFE] p-3">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B7E95]">
                    <MapPin size={13} />
                    Visit
                  </div>
                  <p className="mt-2 text-sm font-semibold">Jaswantgarh</p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== BOTTOM FOOTER ===== */}
          <div className="border-t border-[#E1EAF3] bg-[#F5F8FC] px-5 py-4">
            <div className="flex items-center justify-between text-[11px] text-[#6B7E95]">
              <span className="font-semibold uppercase tracking-[0.22em]">
                App Version
              </span>
              <span className="font-medium text-[#0A2342]">1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
