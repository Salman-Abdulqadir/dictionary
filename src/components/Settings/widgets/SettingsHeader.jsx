import React from "react";
import { useDictionary } from "../../../contexts/DictionaryContext";
import { IoClose } from "react-icons/io5";
const SettingsHeader = () => {
  const { setIsSettingsOpen } = useDictionary();
  return (
    <header className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer"
          onClick={() => setIsSettingsOpen(false)}
        >
          <IoClose size={20} />
        </button>
        <h4 className="font-bold text-lg">Settings</h4>
      </div>
      <div className="divider p-0 m-0"></div>
    </header>
  );
};

export default SettingsHeader;
