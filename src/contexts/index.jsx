import { SearchHistoryContextProvider } from "./SearchHistoryContext";
import { ConfirmationModalContextProvider } from "./ConfirmationModalContext";
import { DictionaryContextProvider } from "./DictionaryContext";

export const AppContextProvider = ({ children }) => {
  return (
    <DictionaryContextProvider>
      <SearchHistoryContextProvider>
        <ConfirmationModalContextProvider>
          {children}
        </ConfirmationModalContextProvider>
      </SearchHistoryContextProvider>
    </DictionaryContextProvider>
  );
};
