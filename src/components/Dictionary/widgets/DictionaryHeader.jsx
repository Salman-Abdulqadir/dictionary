import React from "react";

import ThemeChanger from "../../ThemeChanger";
import { LiaBookSolid } from "react-icons/lia";

const DictionaryHeader = ({ goToHome }) => {
  return (
    <header className="flex items-center justify-between w-full">
      <LiaBookSolid size={50} onClick={goToHome} className="cursor-pointer" />
      <div className="flex gap-4">
        <ThemeChanger />
      </div>
    </header>
  );
};

export default DictionaryHeader;
