import React from "react";

const Drawer = ({ children, isOpen, setIsOpen, position = "right" }) => {
  const allowedPositions = ["right", "left"];
  let modalClassName = `drawer drawer-end`;
  if (allowedPositions.includes(position) && position === "left") {
    modalClassName = `drawer`;
  }
  return (
    <div className={modalClassName}>
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        ></label>
        <div className="h-screen overflow-y-scroll w-full sm:w-full lg:w-1/3 bg-base-100 px-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
