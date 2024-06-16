import React from "react";

import ThemeChanger from "../ThemeChanger";
import { LiaBookSolid } from "react-icons/lia";

const DictionaryHeader = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <LiaBookSolid size={50} />
      <div className="flex">
        {/* <select className="select p-0 w-md max-w-xs">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <div className="divider divider-base-300 divider-horizontal" /> */}
        <ThemeChanger />
      </div>
    </header>
  );
};

export default DictionaryHeader;
