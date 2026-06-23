import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";

function CompactFilter({ label, value, options = [], onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => String(option.id) === String(value));
  const displayName = (selected?.name || "All").replace(/\s*\(.*\)$/, "");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-8 items-center gap-2 rounded-xl border border-[#e7ebef] bg-white px-3 shadow-[0_1px_2px_rgba(15,45,58,0.04)] transition hover:bg-[#fafbfc]"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9aa6b2]">
          {label} :
        </span>
        <span className="max-w-[120px] truncate text-[13px] font-semibold text-[#41576a] sm:max-w-[140px]">
          {displayName}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#9aa6b2] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-[#e7ebef] bg-white py-1 shadow-[0_12px_30px_rgba(15,45,58,0.12)]">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onChange(String(option.id));
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition ${
                String(option.id) === String(value)
                  ? "bg-[#f2f6f8] font-semibold text-[#16384d]"
                  : "text-[#4f6274] hover:bg-[#fafbfc]"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function FilterBar({
  routes = [],
  ferries = [],
  sailings = [],
  selectedRoute,
  setSelectedRoute,
  selectedFerry,
  setSelectedFerry,
  showAllRoutesOption = true,
  filterFerriesByRoute = true,
}) {
  const normalizedFerries = useMemo(
    () =>
      ferries
        .map((ferry) => {
          const ferryName =
            ferry?.cruiseName || ferry?.ferryName || ferry?.name || ferry?.cruiseCode;
          if (!ferryName) return null;

          return {
            id: ferryName,
            name: ferryName,
            cruiseId: ferry?.id ?? ferry?.cruiseId ?? ferry?.cruiseCode ?? null,
          };
        })
        .filter(Boolean),
    [ferries]
  );

  const normalizedRoutes = useMemo(() => {
    const ferryNameByCruiseId = normalizedFerries.reduce((acc, ferry) => {
      if (ferry?.cruiseId == null) return acc;
      acc[String(ferry.cruiseId)] = ferry.name;
      return acc;
    }, {});

    return routes
      .map((route) => {
        const routeId = route?.routeId ?? route?.id;
        if (routeId == null) return null;

        const cruiseId = route?.cruiseId ?? route?.raw?.cruiseId ?? null;
        const ferryName = cruiseId == null ? null : ferryNameByCruiseId[String(cruiseId)] || null;
        const baseRouteName =
          route?.routeName ||
          (route?.origin && route?.destination
            ? `${route.origin} -> ${route.destination}`
            : `Route ${routeId}`);

        return {
          id: String(routeId),
          name: ferryName ? `${baseRouteName} (${ferryName})` : baseRouteName,
          cruiseId,
        };
      })
      .filter(Boolean);
  }, [routes, normalizedFerries]);

  const routeOptions = useMemo(() => {
    const selectedFerryCruiseId =
      selectedFerry === "ALL"
        ? null
        : normalizedFerries.find((ferry) => ferry.id === selectedFerry)?.cruiseId;

    const filteredRoutes =
      selectedFerryCruiseId == null
        ? normalizedRoutes
        : normalizedRoutes.filter(
            (route) => String(route.cruiseId) === String(selectedFerryCruiseId)
          );

    const mappedRoutes = filteredRoutes.map((route) => ({
      id: route.id,
      name: route.name,
      cruiseId: route.cruiseId,
    }));

    return showAllRoutesOption
      ? [{ id: "ALL", name: "All Routes" }, ...mappedRoutes]
      : mappedRoutes;
  }, [normalizedRoutes, normalizedFerries, selectedFerry, showAllRoutesOption]);

  const ferryOptions = useMemo(() => {
    const selectedRouteCruiseId =
      selectedRoute === "ALL"
        ? null
        : normalizedRoutes.find((route) => route.id === String(selectedRoute))?.cruiseId;

    if (normalizedFerries.length > 0) {
      const filteredFerries =
        !filterFerriesByRoute || selectedRouteCruiseId == null
          ? normalizedFerries
          : normalizedFerries.filter(
              (ferry) => String(ferry.cruiseId) === String(selectedRouteCruiseId)
            );

      const seen = new Set();
      const uniqueFerries = filteredFerries.filter((ferry) => {
        if (seen.has(ferry.id)) return false;
        seen.add(ferry.id);
        return true;
      });

      return [{ id: "ALL", name: "All Ferries" }, ...uniqueFerries];
    }

    const ferrySet = new Set();
    sailings.forEach((slot) => {
      if (slot.ferry?.ferryName) {
        ferrySet.add(slot.ferry.ferryName);
      }
    });

    return [
      { id: "ALL", name: "All Ferries" },
      ...Array.from(ferrySet).map((ferry) => ({ id: ferry, name: ferry })),
    ];
  }, [sailings, normalizedFerries, normalizedRoutes, selectedRoute, filterFerriesByRoute]);

  useEffect(() => {
    if (!routeOptions.length) return;

    const selectableRoutes = showAllRoutesOption
      ? routeOptions.filter((route) => route.id !== "ALL")
      : routeOptions;

    if (!showAllRoutesOption && selectableRoutes.length === 0) return;

    const routeExists = routeOptions.some((route) => route.id === String(selectedRoute));
    if (!routeExists) {
      if (showAllRoutesOption) {
        setSelectedRoute("ALL");
      } else {
        setSelectedRoute(selectableRoutes[0].id);
      }
    }
  }, [routeOptions, selectedRoute, showAllRoutesOption, setSelectedRoute]);

  useEffect(() => {
    const ferryExists = ferryOptions.some((ferry) => ferry.id === selectedFerry);
    if (!ferryExists) {
      setSelectedFerry("ALL");
    }
  }, [ferryOptions, selectedFerry, setSelectedFerry]);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-[#edf1f4] pb-4">
      <CompactFilter
        label="Route"
        value={String(selectedRoute)}
        options={routeOptions}
        onChange={(id) =>
          setSelectedRoute(
            id === "ALL"
              ? showAllRoutesOption
                ? "ALL"
                : routeOptions.find((route) => route.id !== "ALL")?.id ?? "ALL"
              : id
          )
        }
      />

      <CompactFilter
        label="Ferry"
        value={selectedFerry}
        options={ferryOptions}
        onChange={(id) => setSelectedFerry(id)}
      />
    </div>
  );
}

FilterBar.propTypes = {
  routes: PropTypes.array,
  ferries: PropTypes.array,
  sailings: PropTypes.array,
  selectedRoute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedRoute: PropTypes.func.isRequired,
  selectedFerry: PropTypes.string,
  setSelectedFerry: PropTypes.func.isRequired,
  showAllRoutesOption: PropTypes.bool,
  filterFerriesByRoute: PropTypes.bool,
};
