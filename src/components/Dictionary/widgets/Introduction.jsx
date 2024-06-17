import React from "react";
import { LiaBookSolid } from "react-icons/lia";
import { LuExternalLink } from "react-icons/lu";

const Introduction = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <span className="text-primary">
        <LiaBookSolid size={200} />
      </span>
      <h1 className="text-6xl font-bold">Dictionary</h1>
      <p className="flex gap-2 items-center text-xl">
        Source: Free Dictionary API
        <a
          href="https://dictionaryapi.dev/"
          target="_blank"
          className="hover:text-primary transition-colors duration-300"
        >
          <LuExternalLink />
        </a>
      </p>
    </div>
  );
};

export default Introduction;
