import SearchResultReducer from "./searchResults";
import { combineReducers } from "redux";
import SearchQueryReducers from "./searchQuery";
import TorrentResultReducer from "./torrentResults";

const allReducers = combineReducers({
  searchResult: SearchResultReducer,
  searchQuery: SearchQueryReducers,
  torResult: TorrentResultReducer,
});

export default allReducers;
