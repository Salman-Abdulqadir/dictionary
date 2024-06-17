import React from "react";
import { BiSolidError } from "react-icons/bi";
const WordNotFound = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <span className="text-primary">
        <BiSolidError size={200} />
      </span>
      <h4>Word Not Found!, Please search the web</h4>
    </div>
  );
};

export default WordNotFound;
