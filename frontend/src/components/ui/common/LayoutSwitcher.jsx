import { motion } from "framer-motion";
import { useState } from "react";

const LayoutSwitcher = ({ layout, setLayout }) => {
    const options = ["default", "cards",];

    return (
        <div className="border border-dashed border-gray-300 rounded-xl px-4 py-3 flex items-center gap-4 w-full bg-gray-50">

            {/* Label */}
            <span className="text-xs font-semibold tracking-wide text-gray-500">
                LAYOUT
            </span>

            {/* Segmented Control */}
            <div className="relative flex bg-white rounded-lg p-1 shadow-sm">

                {options.map((item) => {
                    const isActive = layout === item;

                    return (
                        <button
                            key={item}
                            onClick={() => setLayout(item)}
                            className="relative px-4 py-1.5 text-sm font-medium rounded-md capitalize z-10"
                        >
                            {/* Active Background (Animated) */}
                            {isActive && (
                                <motion.div
                                    layoutId="layout-pill"
                                    className="absolute inset-0 bg-[#0f2d3a] rounded-md"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                />
                            )}

                            {/* Text */}
                            <span
                                className={`relative ${isActive ? "text-white" : "text-gray-600"
                                    }`}
                            >
                                {item}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default LayoutSwitcher;