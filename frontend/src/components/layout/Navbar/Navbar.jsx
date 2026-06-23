import { useCallback, useEffect, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";
import MobileSidebar from "./MobileSidebar";
import LoginModal from "../../ui/LoginModal";
const DEFAULT_COPY = {
  signupLabel: "SIGNUP",
  logoutLabel: "LOGOUT",
};

const DEFAULT_NAV_LINKS = [
  { label: "HOME", path: "/", roleAccess: ["guest", "user", "admin"] },
  { label: "ADMISSIONS", path: "/admissions", roleAccess: ["guest", "user", "admin"] },
  { label: "ACADEMICS", path: "/fleet", roleAccess: ["guest", "user", "admin"] },
  { label: "FAQ", path: "/faq", roleAccess: ["guest", "user", "admin"] },
  { label: "CONTACT US", path: "/contact", roleAccess: ["guest", "user", "admin"] },
  { label: "DASHBOARD", path: "/admin/dashboard", roleAccess: ["admin"] },
  { label: "ABOUT US", path: "/about", roleAccess: ["guest", "user", "admin"] },
];

const MOCK_USER_RESPONSE = null;
const MOCK_LINKS_RESPONSE = DEFAULT_NAV_LINKS;

export default function Navbar({
  initialUser = null,
  initialLinks = [],
  fetchUser,
  fetchLinks,
  copy = DEFAULT_COPY,
  onSignupClick,
  onLoginClick,
  onLogoutClick,
  onProfileClick,
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(
    initialLinks.length > 0 ? initialLinks : DEFAULT_NAV_LINKS
  );

  const mergedCopy = useMemo(
    () => ({
      ...DEFAULT_COPY,
      ...(copy || {}),
    }),
    [copy]
  );

  // API-ready placeholder: replace with real services when backend is wired.
  useEffect(() => {
    let isCancelled = false;

    const resolveUser = fetchUser
      ? fetchUser()
      : new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_USER_RESPONSE), 250);
      });

    const resolveLinks = fetchLinks
      ? fetchLinks()
      : new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_LINKS_RESPONSE), 250);
      });

    Promise.allSettled([resolveUser, resolveLinks]).then(([userResult, linksResult]) => {
      if (isCancelled) return;

      if (userResult.status === "fulfilled") {
        setUser(userResult.value || null);
      }
      if (linksResult.status === "fulfilled" && Array.isArray(linksResult.value)) {
        setNavLinks(linksResult.value);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [fetchLinks, fetchUser]);

  const effectiveRole = user?.role || "guest";
  const filteredLinks = useMemo(
    () =>
      navLinks.filter((link) => {
        if (!Array.isArray(link.roleAccess) || link.roleAccess.length === 0) return true;
        return link.roleAccess.includes(effectiveRole);
      }),
    [effectiveRole, navLinks]
  );

  const openMenuSidebar = useCallback(() => {
    setProfileSidebarOpen(false);
    setSidebarOpen(true);
  }, []);

  const closeMenuSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const closeProfileSidebar = useCallback(() => {
    setProfileSidebarOpen(false);
  }, []);

  const handleAuthAction = useCallback(() => {
    if (user) {
      setProfileSidebarOpen(true);
      setSidebarOpen(false);
      return;
    }
    if (onLoginClick) {
      onLoginClick();
      return;
    }
    if (onSignupClick) onSignupClick();
  }, [onLoginClick, onSignupClick, user]);

  const handleDesktopLogout = useCallback(() => {
    if (onLogoutClick) {
      onLogoutClick();
      return;
    }
    setUser(null);
  }, [onLogoutClick]);

  useEffect(() => {
    if (!isSidebarOpen && !isProfileSidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen, isProfileSidebarOpen]);

  return (
    <>
      <nav className="navbar fixed top-0 left-0 z-50 w-full flex items-center justify-between backdrop-blur-md">

        {/* gradient background */}
        <div className="absolute inset-0 bg-nav opacity-50 backdrop-blur-md md:opacity-70 md:block hidden"></div>

        {/* mobile background */}
        <div className="navbar-mobile-bg absolute inset-0 md:hidden" aria-hidden />

        <div className="navbar-desktop relative mx-auto flex w-full max-w-[1300px] items-center justify-between px-8 text-white min-h-[72px]">
          <NavbarLogo />
          <NavbarLinks links={filteredLinks} />
          <NavbarActions
            user={user}
            copy={mergedCopy}
            onSignupClick={onSignupClick}
            onLogoutClick={handleDesktopLogout}
            onProfileClick={onProfileClick}
          />
        </div>

        <div className="navbar-mobile relative mx-auto text-primary w-full">
          {/* LEFT: MENU */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="navbar-mobile-menu"
            onClick={openMenuSidebar}
          >
            <Menu size={22} strokeWidth={2.4} />
          </button>

          {/* CENTER: LOGO (DESKTOP SAME) */}
          <div className="navbar-logo-mobile">
            <NavbarLogo />
          </div>

          {/* RIGHT: SIGNUP BUTTON */}
          <button
            type="button"
            onClick={() => setIsLoginOpen(true)}
            className="bg-primary-dark text-white text-[12px] px-4 py-2 rounded-[6px] font-semibold transition-all duration-150 ease-out hover:brightness-110 active:scale-[0.98] active:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label={user ? "Open account menu" : "Login or signup"}
          >
            {user ? user.firstName || "ACCOUNT" : mergedCopy.signupLabel}
          </button>
        </div>
      </nav>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={closeMenuSidebar}
        links={filteredLinks}
        user={user}
        onAuthAction={handleAuthAction}
        onLogout={handleDesktopLogout}
      />
      <MobileSidebar
        isOpen={isProfileSidebarOpen}
        onClose={closeProfileSidebar}
        side="right"
        user={user}
        onAuthAction={handleAuthAction}
        onLogout={handleDesktopLogout}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}
