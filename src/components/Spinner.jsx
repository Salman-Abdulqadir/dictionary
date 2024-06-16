import React from "react";

const Spinner = () => {
  return (
    <div className="h-full flex-1 flex flex-col justify-center items-center">
      <span className="loading loading-spin loading-lg text-primary"></span>
    </div>
  );
};

export default Spinner;
