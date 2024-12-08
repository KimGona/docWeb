import React from "react";

const Spacer = ({ size = "1rem", direction = "vertical" }) => {
  const isVertical = direction === "vertical";
  return (
    <div
      style={{
        display: isVertical ? "block" : "inline-block",
        width: isVertical ? "100%" : size,
        height: isVertical ? size : "100%",
      }}
    />
  );
};

export default Spacer;