import React from "react";

const ColoredText = ({ text, bgColor = "bg-blue-200", textColor = "text-gray-100" }) => {
  return (
    <div
      className={` whitespace-nowrap px-3 py-1 rounded-full font-bold text-sm ${bgColor} ${textColor}`}
    >
      {text}
    </div>
  );
};

export default ColoredText;
