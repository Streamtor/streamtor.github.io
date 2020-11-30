import SearchResultReducer from "./searchResults";
import { combineReducers } from "redux";
import SearchQueryReducers from "./searchQuery";
import TorrentResultReducer from "./torrentResults";
import SelectedTorFileReducer from "./selectedTor";
import TorFleDetailsReducer from "./torFileDetails";

const allReducers = combineReducers({
  searchResult: SearchResultReducer,
  searchQuery: SearchQueryReducers,
  torResult: TorrentResultReducer,
  selectedTorFile: SelectedTorFileReducer,
  torFileDetails: TorFleDetailsReducer,
});

export default allReducers;
