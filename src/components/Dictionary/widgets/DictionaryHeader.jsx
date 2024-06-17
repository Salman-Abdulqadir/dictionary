import React from "react";

import ThemeChanger from "../../ThemeChanger";
import { LiaBookSolid } from "react-icons/lia";

const DictionaryHeader = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <LiaBookSolid size={50} />
      <div className="flex gap-4">
        <ThemeChanger />
      </div>
    </header>
  );
};

export default DictionaryHeader;
