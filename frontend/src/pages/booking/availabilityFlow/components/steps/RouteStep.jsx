import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { selectRoutes as selectSessionRoutes, selectSelectedRouteId } from "../../../../../features/booking/availabilitySession/availabilitySelectors";
import { setRoute, setStep } from "../../../../../features/booking/availabilitySession/availabilitySessionSlice";
import {
  loadRoutes,
  selectRoutes as selectMasterRoutes,
  selectActiveRoutesForAvailability,
} from "../../../../../features/booking/routes/routesSlice";
import { Anchor, MapPin, Ship } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LayoutSwitcher from "../../../../../components/ui/common/LayoutSwitcher";

const getRouteHaulType = (route) => {
  const hasMandatorySeatSelection =
    route?.sailings?.some((s) => s?.seatSelectionMandatory === true) ?? false;
  return hasMandatorySeatSelection ? "LONG_HAUL" : "SHORT_HAUL";
};

const RouteCard = ({ route, isSelected, onSelect, haulType, ferries }) => {
  const formattedName = route.routeName
    .replace(/\s*(?:->|–|—|→|↔|-)\s*/g, " -> ") // normalize everything to ->
    .replace(/\s*->\s*/g, " -> ")              // fix spacing
    .trim()
    .toUpperCase();

  const subtitle =
    haulType === "LONG_HAUL"
      ? "Selected dates • Evening departures"
      : `Daily service • ${ferries.length ? ferries.join(" & ") : "Multiple ferries"}`;

  return (
    <div
      onClick={() => onSelect(route.routeId)}
      className={`
        border rounded-2xl p-5 flex justify-between items-center cursor-pointer transition
        ${isSelected
          ? "border-[#0f2d3a] shadow-sm"
          : "border-[#cfd8e3] hover:border-[#9fb0c4]"}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(route.routeId);
        }
      }}
    >
      <div className="flex items-center gap-4">
        {haulType === "LONG_HAUL" ? (
          <Anchor className="w-7 h-auto text-[#0f2d3a]" />
        ) : (
          <MapPin className="w-7 h-auto text-[#0f2d3a]" />
        )}

        <div>
          <p className="font-semibold text-lg sm:text-xl leading-none tracking-wide text-[#0b1f44]">
            {formattedName}
          </p>
          <p className="text-xs text-[#355477] mt-2">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Icon */}
      <div className="flex items-center gap-3">
        <Ship className="w-6 h-auto" />
        {isSelected && (
          <span className="text-[#0f2d3a] font-semibold">
            ✓
          </span>
        )}
      </div>
    </div>
  );
};

RouteCard.propTypes = {
  route: PropTypes.shape({
    routeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    routeName: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  haulType: PropTypes.oneOf(["SHORT_HAUL", "LONG_HAUL"]),
  ferries: PropTypes.arrayOf(PropTypes.string),
};

RouteCard.defaultProps = {
  isSelected: false,
  haulType: "SHORT_HAUL",
  ferries: [],
};

const RouteCardV2 = ({ route, isSelected, onSelect, haulType }) => {
  const formattedName = route.routeName
    .replace(/\s*(?:->|–|—|→|↔|-)\s*/g, " -> ") // normalize everything to ->
    .replace(/\s*->\s*/g, " -> ")              // fix spacing
    .trim()
    .toUpperCase();

  return (
    <div
      onClick={() => onSelect(route.routeId)}
      className={`
        relative rounded-2xl border p-6 cursor-pointer transition
        ${isSelected
          ? "border-[#0f2d3a] shadow-md bg-white"
          : "border-gray-200 bg-gray-50 hover:border-gray-300"}
      `}
    >
      {/* Badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-[#0f2d3a] text-white text-xs px-2 py-1 rounded-full">
          ✓
        </div>
      )}

      {/* Title */}
      <p className="text-xl font-semibold text-[#0b1f44]">
        {formattedName}
      </p>

      {/* Meta */}
      <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
        <span>~{haulType === "LONG_HAUL" ? "8 hours" : "1 hour"}</span>
        <span>•</span>
        <span>
          {haulType === "LONG_HAUL"
            ? "Tue & Fri • Overnight"
            : "Daily • Multiple departures"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-3">
        {haulType === "LONG_HAUL"
          ? "Overnight cruise experience"
          : "Comfortable short ferry ride"}
      </p>
    </div>
  );
};

const RouteStep = () => {
  const dispatch = useDispatch();
  const [layout, setLayout] = useState("default"); // "default" | "cards"

  const { loaded: masterRoutesLoaded } = useSelector(
    selectMasterRoutes("ACTIVE")
  );
  const normalizedMasterRoutes = useSelector(selectActiveRoutesForAvailability);

  const snapshotRoutes = useSelector(selectSessionRoutes);
  const selectedRouteId = useSelector(selectSelectedRouteId);


  useEffect(() => {
    if (!masterRoutesLoaded) {
      dispatch(loadRoutes({ status: "ACTIVE" }));
    }
  }, [dispatch, masterRoutesLoaded]);

  const routesWithMeta = useMemo(() => {
    const snapshotById = new Map(snapshotRoutes.map((route) => [String(route.routeId), route]));

    return normalizedMasterRoutes.map((route) => {
      const snapshotRoute = snapshotById.get(String(route.routeId));
      const haulType = getRouteHaulType(snapshotRoute);
      const ferries = Array.from(
        new Set((snapshotRoute?.sailings ?? []).map((s) => s?.ferry?.ferryName).filter(Boolean))
      );

      return {
        ...route,
        haulType,
        ferries,
      };
    });
  }, [normalizedMasterRoutes, snapshotRoutes]);

  if (!routesWithMeta.length) return null;

  const shortHaul = routesWithMeta.filter((r) => r.haulType === "SHORT_HAUL");
  const longHaul = routesWithMeta.filter((r) => r.haulType === "LONG_HAUL");

  return (
    <div className="space-y-7">
      <LayoutSwitcher layout={layout} setLayout={setLayout} />
      <div>
        <h2 className="text-2xl font-semibold">
          Select Route
        </h2>
        <p className="text-lg text-gray-500 mt-1">
          Choose your travel direction
        </p>
      </div>

      {/* SHORT HAUL */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-sm uppercase tracking-wide text-[#355477] font-semibold">
            Short Haul - ~1 Hr
          </p>
          <div className="h-px bg-[#d6e0ea] flex-1" />
        </div>

        <motion.div
          layout
          className={
            layout === "cards"
              ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
              : "space-y-4"
          }
        >
          {shortHaul.map((route) => (
            layout === "cards" ? (
              <RouteCardV2
                key={route.routeId}
                route={route}
                haulType={route.haulType}
                isSelected={selectedRouteId === route.routeId}
                onSelect={(id) => {
                  dispatch(setRoute(id));
                  dispatch(setStep("date"));
                }}
              />
            ) : (
              <RouteCard
                key={route.routeId}
                route={route}
                haulType={route.haulType}
                ferries={route.ferries}
                isSelected={selectedRouteId === route.routeId}
                onSelect={(id) => {
                  dispatch(setRoute(id));
                  dispatch(setStep("date"));
                }}
              />
            )
          ))}
        </motion.div>
      </div>

      {/* LONG HAUL (optional future) */}
      {longHaul.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <p className="text-sm uppercase tracking-wide text-[#355477] font-semibold">
              Long Haul - ~8 Hrs Overnight
            </p>
            <div className="h-px bg-[#d6e0ea] flex-1" />
          </div>

          {longHaul.map((route) => (
            <RouteCard
              key={route.routeId}
              route={route}
              haulType={route.haulType}
              ferries={route.ferries}
              isSelected={
                selectedRouteId === route.routeId
              }
              onSelect={(id) => {
                dispatch(setRoute(id));
                dispatch(setStep("date"));
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default RouteStep;