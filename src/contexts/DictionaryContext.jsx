import { createContext, useContext, useState } from "react";

const DictionaryContext = createContext();

export const useDictionary = () => useContext(DictionaryContext);

export const DictionaryContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [wordMeaning, setWordMeaning] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <DictionaryContext.Provider
      value={{
        searchValue,
        setSearchValue,
        wordMeaning,
        setWordMeaning,
        isModalOpen,
        setIsModalOpen,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};
