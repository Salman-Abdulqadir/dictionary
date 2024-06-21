import React from "react";

const Tooltip = ({ children, title, position = "bottom" }) => {
  if (!["bottom", "right", "left", "top"].includes(position))
    position = "bottom";
  return (
    <div className={`tooltip tooltip-${position}`} data-tip={title}>
      {children}
    </div>
  );
};

export default Tooltip;
