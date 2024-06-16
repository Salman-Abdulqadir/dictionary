const HttpService = {
  get: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error(data);
    return data[0];
  },
};

export const DictionaryService = {
  getWordMeaning: async (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const meaning = await HttpService.get(url);
    return meaning;
  },
};
