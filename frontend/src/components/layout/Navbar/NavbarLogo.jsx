import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import fallbackLogo from "../../../assets/logo/vfs-logo.png";

const SIZE_CLASS_MAP = {
  sm: "h-8",
  md: "h-20",
  lg: "h-12",
};

function NavbarLogo({
  logo,
  alt = "Brand logo",
  size = "md",
  className = "",
}) {
  const resolvedSizeClass = SIZE_CLASS_MAP[size] || SIZE_CLASS_MAP.md;
  const resolvedLogo = useMemo(() => logo || fallbackLogo, [logo]);

  return (
    <Link
      to="/"
      aria-label="Go to home"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <img
        src={resolvedLogo}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`${resolvedSizeClass} w-auto object-contain`}
      />
    </Link>
  );
}

export default memo(NavbarLogo);
