import React from "react";
import { BiSolidError } from "react-icons/bi";
const WordNotFound = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4 bg-primary">
      <BiSolidError />
    </div>
  );
};

export default WordNotFound;
