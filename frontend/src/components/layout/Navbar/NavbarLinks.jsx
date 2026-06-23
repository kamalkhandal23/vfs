import { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";

function NavbarLinks({
  links = [],
  userRole = "guest",
  isLoading = false,
  className = "",
  listClassName = "",
  itemClassName = "",
  showWhenEmpty = true,
  emptyLabel = "No links available",
}) {
  const filteredLinks = useMemo(() => {
    if (!Array.isArray(links)) return [];

    return links.filter((link) => {
      if (!link || typeof link !== "object") return false;
      if (!link.label) return false;
      if (!Array.isArray(link.roleAccess) || link.roleAccess.length === 0) return true;
      return link.roleAccess.includes(userRole);
    });
  }, [links, userRole]);

  const baseListClass =
    "hidden max-w-[900px] items-center gap-6 whitespace-nowrap text-[14px] font-semibold tracking-wide md:flex lg:gap-8";
  const baseItemClass = "inline-flex items-center whitespace-nowrap transition-all duration-200";

  if (isLoading) {
    return (
      <ul
        className={`${baseListClass} ${className} ${listClassName}`}
        aria-label="Navigation loading"
        aria-busy="true"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={`nav-skeleton-${index}`} aria-hidden="true">
            <span className="inline-block h-4 w-20 rounded bg-white/25 animate-pulse" />
          </li>
        ))}
      </ul>
    );
  }

  if (filteredLinks.length === 0) {
    if (!showWhenEmpty) return null;
    return (
      <ul className={`${baseListClass} ${className} ${listClassName}`} aria-label="Navigation">
        <li className="text-white/70">{emptyLabel}</li>
      </ul>
    );
  }

  return (
    <ul className={`${baseListClass} ${className} ${listClassName}`} aria-label="Navigation">
      {filteredLinks.map((link, index) => {
        const stableKey = `${link.path || "missing-path"}-${link.label}-${index}`;

        if (!link.path) {
          return (
            <li key={stableKey}>
              <span
                className={`${baseItemClass} text-white/60 cursor-not-allowed ${itemClassName}`}
                aria-disabled="true"
              >
                {link.label}
              </span>
            </li>
          );
        }

        if (link.isExternal) {
          return (
            <li key={stableKey}>
              <a
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseItemClass} text-white hover:text-white ${itemClassName}`}
              >
                {link.label}
              </a>
            </li>
          );
        }

        return (
          <li key={stableKey}>
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `${baseItemClass} ${
                  isActive
                    ? "scale-95 bg-gradient-to-r from-[#00CFC8] to-[#137DC5] bg-clip-text text-transparent"
                    : "text-white hover:text-white"
                } ${itemClassName}`
              }
            >
              {link.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(NavbarLinks);
