import { memo, useMemo } from "react";
import fallbackAvatar from "../../../assets/icons/user2.png";

const DEFAULT_COPY = {
  signupLabel: "SIGNUP",
  loginLabel: "LOGIN",
  logoutLabel: "LOGOUT",
  profileAriaLabel: "Open profile menu",
  accountAriaLabel: "Open account menu",
};

const DEFAULT_ACTION_ROLE_ACCESS = {
  profile: ["user", "admin"],
  authButton: ["guest", "user", "admin"],
};

function NavbarActions({
  user = null,
  userRole = "guest",
  isLoading = false,
  copy,
  roleAccess = DEFAULT_ACTION_ROLE_ACCESS,
  showAvatarOnTablet = true,
  onLoginClick,
  onSignupClick,
  onLogoutClick,
  onProfileClick,
  className = "",
}) {
  const mergedCopy = useMemo(
    () => ({
      ...DEFAULT_COPY,
      ...(copy || {}),
    }),
    [copy]
  );

  const actionRoleAccess = useMemo(
    () => ({
      ...DEFAULT_ACTION_ROLE_ACCESS,
      ...(roleAccess || {}),
    }),
    [roleAccess]
  );

  const resolvedRole = user?.role || userRole || "guest";
  const isAuthenticated = Boolean(user);
  const canShowProfile = actionRoleAccess.profile.includes(resolvedRole);
  const canShowAuthButton = actionRoleAccess.authButton.includes(resolvedRole);

  const authButtonLabel = isAuthenticated
    ? mergedCopy.logoutLabel
    : mergedCopy.signupLabel || mergedCopy.loginLabel;
  const authButtonHandler = isAuthenticated
    ? onLogoutClick
    : onSignupClick || onLoginClick;

  if (isLoading) {
    return (
      <div className={`ml-6 flex shrink-0 items-center gap-4 ${className}`} aria-busy="true">
        <div className="hidden items-center gap-4 md:flex lg:hidden" aria-hidden>
          <span className="h-10 w-10 rounded-full bg-white/30 animate-pulse" />
        </div>
        <span className="hidden h-10 w-24 rounded-lg bg-white/20 animate-pulse lg:block" aria-hidden />
      </div>
    );
  }

  return (
    <div className={`ml-6 flex shrink-0 items-center gap-4 ${className}`}>
      {showAvatarOnTablet && canShowProfile ? (
        <div className="hidden items-center gap-4 md:flex lg:hidden">
          <AvatarActionButton
            avatarSrc={user?.avatar || fallbackAvatar}
            userName={user?.name}
            ariaLabel={isAuthenticated ? mergedCopy.profileAriaLabel : mergedCopy.accountAriaLabel}
            onClick={onProfileClick}
          />
        </div>
      ) : null}

      {canShowAuthButton ? (
        <button
          type="button"
          onClick={authButtonHandler}
          aria-label={authButtonLabel}
          className="hidden shrink-0 rounded-lg bg-primary-dark px-4 py-2 text-sm font-semibold transition hover:bg-primary active:scale-[0.98] active:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:block"
        >
          {authButtonLabel}
        </button>
      ) : null}
    </div>
  );
}

function AvatarActionButton({ avatarSrc, userName, ariaLabel, onClick }) {
  const avatarAlt = userName ? `${userName} profile` : "Profile";
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-full"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className="h-7 w-7 rounded-full object-cover"
        />
      </div>
    </button>
  );
}

export { AvatarActionButton };
export default memo(NavbarActions);
