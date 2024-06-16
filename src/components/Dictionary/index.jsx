import React, { useEffect, useState } from "react";
import useApi, { API_STATES } from "../../hooks/useApi.hook";
import { DictionaryService } from "../../services/dictionary.service";

import DictionaryHeader from "./DictionaryHeader";
import DictionarySearch from "./DictionarySearch";
import DictionaryResult from "./DictionaryResult";
import Spinner from "../Spinner";
import WordNotFound from "./WordNotFound";
import Introduction from "./Introduction";

const Dictionary = () => {
  const [dictionaryApiResponse, callDictionaryApi, resetApiState] = useApi(
    DictionaryService.getWordMeaning
  );
  const [searchValue, setSearchValue] = useState("");
  const [wordMeaning, setWordMeaning] = useState(null);
  const onSearch = async () => {
    if (!searchValue) {
      setWordMeaning(null);
      resetApiState();
      return;
    }
    callDictionaryApi(searchValue);
  };
  const onWordClick = (word) => {
    if (!word) return;
    setSearchValue(word);
    callDictionaryApi(word);
  };
  useEffect(() => {
    if (dictionaryApiResponse.state === API_STATES.SUCCESS) {
      setWordMeaning(dictionaryApiResponse.data);
    } else if (dictionaryApiResponse.state === API_STATES.ERROR) {
      setWordMeaning(null);
    }
  }, [dictionaryApiResponse.state]);

  const isLoading = dictionaryApiResponse.state === API_STATES.LOADING;
  const isError = dictionaryApiResponse.state === API_STATES.ERROR;

  const getContent = () => {
    if (!wordMeaning && !isError && !isLoading) return <Introduction />;
    if (isLoading) return <Spinner />;
    if (isError) return <WordNotFound />;
    return (
      <DictionaryResult wordMeaning={wordMeaning} onWordClick={onWordClick} />
    );
  };
  return (
    <section className="flex flex-col flex-grow gap-4 min-h-screen w-full sm:w-full lg:w-3/4 p-4">
      <DictionaryHeader />
      <DictionarySearch
        onSearch={onSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {getContent()}
    </section>
  );
};

export default Dictionary;
