import SearchResultReducer from "./searchResults";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  searchResult: SearchResultReducer,
});

export default allReducers;
