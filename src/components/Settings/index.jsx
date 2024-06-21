import React from "react";
import { useDictionary } from "../../contexts/DictionaryContext";

import Drawer from "../Drawer";
import SettingsHeader from "./widgets/SettingsHeader";
import SettingsIntervalOptions from "./widgets/SettingsIntervalOptions";

const Settings = () => {
  const { isSettingsOpen, setIsSettingsOpen } = useDictionary();
  return (
    <Drawer isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen}>
      <div className="h-screen p-4">
        <SettingsHeader />
        <SettingsIntervalOptions />
      </div>
    </Drawer>
  );
};

export default Settings;
