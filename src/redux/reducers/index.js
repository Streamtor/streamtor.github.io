import SearchResultReducer from "./searchResults";
import { combineReducers } from "redux";
import SearchQueryReducers from "./searchQuery";

const allReducers = combineReducers({
  searchResult: SearchResultReducer,
  searchQuery: SearchQueryReducers,
});

export default allReducers;
