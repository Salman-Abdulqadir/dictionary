import uuid4 from "uuid4";
import { API_STATES } from "../hooks/useApi.hook";

export class SearchHistoryService {
  static localStorageKey = "SEARCH_HISTORY";
  static getSearchHistories = () => {
    try {
      const data = JSON.parse(localStorage.getItem(this.localStorageKey));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };
  static setSearchHistories = (searchHistories) => {
    try {
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(searchHistories)
      );
    } catch {}
  };
  static addSearchHistory = (search, state) => {
    if (!search || [API_STATES.IDLE, API_STATES.LOADING].includes(state))
      return;
    const searchToAdd = {
      id: uuid4(),
      searchedDate: new Date(),
      searchState: state,
      searchString: search,
    };
    const allSearchHistory = this.getSearchHistories();
    this.setSearchHistories([searchToAdd, ...allSearchHistory]);
  };
  static deleteSearchHistoryById = (id) => {
    const allSearchHistories = this.getSearchHistories();
    const filteredSearchHistories = allSearchHistories.filter(
      (search) => search.id !== id
    );
    this.setSearchHistories(filteredSearchHistories);
  };
  static clearSearchHistory = () => {
    this.setSearchHistories([]);
  };
}
