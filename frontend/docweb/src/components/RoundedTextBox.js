import React from "react";

const RoundedTextBox = ({ text, bgColor = "bg-gray-100", textColor = "text-gray-700" }) => {
  return (
    <div
      className={`inline-flex flex items-center justify-center px-2 py-1 rounded-lg shadow-sm border ${bgColor} ${textColor}`}
    >
      {text}
    </div>
  );
};

export default RoundedTextBox;