import { useRef, useState, useEffect } from "react";
import carIcon from "../../../assets/icons/car-icon.svg";
import motorbikeIcon from "../../../assets/icons/motorbike-icon.svg";
import bicycleIcon from "../../../assets/icons/bicycle-icon.svg";
import busIcon from "../../../assets/icons/bus-icon.svg";
import { useOutsideClick } from "../DatePickerPopover/useOutsideClick";

export default function VehiclePopover({ vehicles, onChange, onClose }) {
    const ref = useRef();
    const [show, setShow] = useState(false);
    const [local, setLocal] = useState(vehicles);

    useOutsideClick(ref, () => {
        setShow(false);
        setTimeout(onClose, 150);
    });

    useEffect(() => {
        setShow(true);
    }, []);

    const update = (type, value) => {
        const updated = {
            ...local,
            [type]: Math.max(0, value),
        };

        setLocal(updated);
        onChange(updated);
    };

    return (
        <div
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            className={`
    absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-[99999]
    w-[220px]
    bg-white rounded-[12px]
    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
    p-3
    transition-all duration-200 origin-top
    ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
  `}
        >
            {/* 🔥 TOP ARROW */}
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white shadow-[-2px_-2px_8px_rgba(0,0,0,0.04)]" />
            <Row
                icon={<img src={carIcon} alt="" className="h-[18px] w-[18px] object-contain" />}
                label="Car"
                value={local.cars}
                onChange={(v) => update("cars", v)}
            />

            <Row
                icon={<img src={motorbikeIcon} alt="" className="h-[18px] w-[18px] object-contain" />}
                label="Bike"
                note="*No e-scooters allowed"
                value={local.bikes}
                onChange={(v) => update("bikes", v)}
            />

            <Row
                icon={<img src={bicycleIcon} alt="" className="h-[18px] w-[18px] object-contain" />}
                label="Cycle"
                note="Below 3 Years"
                value={local.bicycles}
                onChange={(v) => update("bicycles", v)}
            />

            <Row
                icon={<img src={busIcon} alt="" className="h-[18px] w-[18px] object-contain" />}
                label="Bus"
                note="Contact To Book"
                value={local.buses}
                onChange={(v) => update("buses", v)}
            />
            <button
                onClick={() => {
                    setShow(false);
                    setTimeout(onClose, 150);
                }}
                className="mt-3 w-full rounded-lg bg-primary-dark py-2 text-sm font-semibold text-white"
            >
                Done
            </button>
        </div>
    );
}

function Row({ icon, label, note, value, onChange }) {
    return (
        <div className="flex items-center justify-between py-2 border-b last:border-none border-gray-100">
            <div className="flex items-start gap-2">
                <span className="mt-1">{icon}</span>

                <div>
                    <p className="text-[14px] font-semibold text-primary-dark">
                        {label}
                    </p>

                    {note && (
                        <p className="text-[9px] text-gray-400 leading-tight">
                            {note}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onChange(value - 1);
                    }}
                    className="h-5 w-5 rounded bg-primary-dark text-white text-xs flex items-center justify-center"
                >
                    -
                </button>

                <span className="h-5 min-w-[22px] rounded border border-gray-200 text-[12px] flex items-center justify-center">
                    {value}
                </span>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onChange(value + 1);
                    }}
                    className="h-5 w-5 rounded bg-primary-dark text-white text-xs flex items-center justify-center"
                >
                    +
                </button>
            </div>
        </div>
    );
}
