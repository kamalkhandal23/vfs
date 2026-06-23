/* eslint-disable react/prop-types */

/**
 * Tooltip.jsx - Tailwind CSS Tooltip Component
 * Usage:
 * <Tooltip text="Your tooltip text"><YourIconOrElement /></Tooltip>
 */

// const Tooltip = ({ text, children }) => (
//   <div className="relative inline-flex items-center group z-[9999]">
//     {children}
//     <span className="absolute pointer-events-none opacity-0 group-hover:opacity-100 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded shadow-lg border border-gray-800 transition-all duration-200 whitespace-nowrap z-50 bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2">
//       {text}
//       <span className="absolute w-2 h-2 bg-gray-900 border border-gray-800 transform rotate-45 bottom-[-4px] left-1/2 -translate-x-1/2" />
//     </span>
//   </div>
// );

// export default Tooltip;


const Tooltip = ({ text, children }) => (
  <div className="relative inline-flex items-center group">

    {/* Trigger */}
    <div className="flex items-center">
      {children}
    </div>

    {/* Tooltip */}
    <span
      className="
        pointer-events-none
        absolute
        bottom-full
        left-1/2
        -translate-x-1/2
        mb-2
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-150
        px-2 py-1
        text-[11px]
        font-medium
        text-gray-700
        bg-white
        border border-gray-200
        rounded-md
        shadow-md
        whitespace-nowrap
        z-50
      "
    >
      {text}

      {/* Arrow */}
      <span
        className="
    absolute
    w-2 h-2
    bg-white
    border-b border-r border-gray-200
    rotate-45
    bottom-[-4px]
    left-1/2
    -translate-x-1/2
  "
      />
    </span>

  </div>
);

export default Tooltip;