import React, { useEffect, useState } from "react";

import useApi, { API_STATES } from "../../hooks/useApi.hook";
import { DictionaryService } from "../../services/dictionary.service";
import { SearchHistoryService } from "../../services/searchHistory.service";

import DictionaryHeader from "./widgets/DictionaryHeader";
import DictionarySearch from "./widgets/DictionarySearch";
import DictionaryResult from "./widgets/DictionaryResult";
import Spinner from "../Spinner";
import WordNotFound from "./widgets/WordNotFound";
import Introduction from "./widgets/Introduction";
import SearchHistory from "../SearchHistory";
import { useDictionary } from "../../contexts/DictionaryContext";

const Dictionary = () => {
  const [dictionaryApiResponse, callDictionaryApi, resetApiState] = useApi(
    DictionaryService.getWordMeaning
  );
  const {
    searchValue,
    setSearchValue,
    wordMeaning,
    setWordMeaning,
    setIsModalOpen,
  } = useDictionary();
  const onSearch = async () => {
    if (
      dictionaryApiResponse?.data &&
      (searchValue?.toUpperCase() ===
        dictionaryApiResponse?.data[0]?.toUpperCase() ||
        searchValue?.toUpperCase() === wordMeaning?.word?.toUpperCase())
    )
      return;
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
    SearchHistoryService.addSearchHistory(
      searchValue,
      dictionaryApiResponse.state
    );
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
    <section className="flex flex-col flex-grow gap-4 h-screen w-full sm:w-full lg:w-3/4 p-4 overflow-y-scroll">
      <DictionaryHeader
        goToHome={() => {
          setWordMeaning(null);
          setSearchValue("");
          resetApiState();
        }}
      />
      <div className="sticky top-0 bg-base-100">
        <DictionarySearch
          onSearch={onSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          openSearchHistory={() => setIsModalOpen(true)}
        />
      </div>
      {getContent()}

      <SearchHistory onWordClick={onWordClick} />
    </section>
  );
};

export default Dictionary;
