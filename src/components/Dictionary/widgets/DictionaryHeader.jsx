import React from "react";

import ThemeChanger from "../../ThemeChanger";
import { LiaBookSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { useDictionary } from "../../../contexts/DictionaryContext";
import Tooltip from "../../Tooltip";

const DictionaryHeader = ({ goToHome }) => {
  const { setIsModalOpen, setIsSettingsOpen } = useDictionary();
  const openSearchHistory = () => setIsModalOpen(true);
  const openSettings = () => setIsSettingsOpen(true);
  return (
    <header className="flex items-center justify-between w-full ">
      <LiaBookSolid size={50} onClick={goToHome} className="cursor-pointer" />
      <div className="flex items-center gap-4">
        <ThemeChanger />
        <Tooltip title={"History"}>
          <button
            className="btn btn-ghost btn-circle btn-sm"
            onClick={openSearchHistory}
          >
            <FaHistory size={20} />
          </button>
        </Tooltip>

        <Tooltip title={"Settings"}>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={openSettings}
          >
            <IoSettingsOutline size={25} />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default DictionaryHeader;
