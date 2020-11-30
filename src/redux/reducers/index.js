import SearchResultReducer from "./searchResults";
import { combineReducers } from "redux";
import SearchQueryReducers from "./searchQuery";
import TorrentResultReducer from "./torrentResults";
import SelectedTorFileReducer from "./selectedTor";
import TorFleDetailsReducer from "./torFileDetails";
import StreamVideoURLReducer from "./videoStreamURL";

const allReducers = combineReducers({
  searchResult: SearchResultReducer,
  searchQuery: SearchQueryReducers,
  torResult: TorrentResultReducer,
  selectedTorFile: SelectedTorFileReducer,
  torFileDetails: TorFleDetailsReducer,
  streamURL: StreamVideoURLReducer,
});

export default allReducers;
