import React from "react";

const ActionButton = ({ label, icon: Icon, onClick, isActionDisabled, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={isActionDisabled}
      className={`flex items-center gap-2 bg-[#1b6983] text-white px-3 py-1 rounded hover:bg-[#1b6983e6] transition ${className} disabled:bg-opacity-60 disabled:cursor-not-allowed`}
    >
      {/* If icon is passed, render it */}
      {Icon && <Icon size={16} />}
      {label}
    </button>
  );
};

export default ActionButton;
