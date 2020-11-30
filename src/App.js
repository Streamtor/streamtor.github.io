import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import dotsCross from "./assets/DotsCross.png";
import dotsBottom from "./assets/BottomDots.png";
import dotsRight from "./assets/RightSideDots.png";
import dotsTop from "./assets/DotsTop.png";
import { Icon } from "@iconify/react";
import menuMotion from "@iconify/icons-gg/menu-motion";
import Home from "./Pages/Home/home";
import SearchResult from "./Pages/MoviesList/SearchResult";
import TorrentList from "./Pages/TorrentList/TorrentList";
import ShowFileList from "./Pages/ShowFileList/ShowFileList";

function App() {
  return (
    <div className="App">
      <img src={dotsCross} className="dots-left" />
      <img src={dotsBottom} className="dots-bottom" />
      <img src={dotsRight} className="dots-right" />
      <img src={dotsTop} className="dots-top" />
      <div className="app-menu-icon-wrapper">
        <div className="app-menu-icon">
          <Icon icon={menuMotion} style={{ color: "#fff" }} />
        </div>
      </div>
      <div>
        <span className="App-title">STREAMTOR</span>
      </div>
      <HashRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/search">
            <SearchResult />
          </Route>
          <Route path="/torrent">
            <TorrentList />
          </Route>
          <Route path="/file">
            <ShowFileList />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
