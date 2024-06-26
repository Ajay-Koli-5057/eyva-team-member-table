import React, { useState } from "react";

const Checkbox = ({ checked, onChange }: any) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-4 h-4 rounded-md border border-gray-400 cursor-pointer transition duration-300 ${
        checked
          ? "bg-purple-600 border-purple-600"
          : hovered
          ? "bg-purple-200 border-purple-900"
          : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onChange}
    >
      {checked && (
        <svg
          className="w-4 h-4 text-white pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
};

export default Checkbox;
