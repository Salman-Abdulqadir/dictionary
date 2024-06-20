import React from "react";
import Drawer from "../Drawer";
import { useDictionary } from "../../contexts/DictionaryContext";

const Settings = () => {
  const { isSettingsOpen, setIsSettingsOpen } = useDictionary();
  return (
    <Drawer isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen}>
      <div className="h-screen p-4">
        <header className="space-y-2">
          <h4 className="font-bold text-lg">Settings</h4>
          <div className="divider p-0 m-0"></div>
        </header>
      </div>
    </Drawer>
  );
};

export default Settings;
