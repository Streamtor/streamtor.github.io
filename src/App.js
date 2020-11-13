import "./App.css";
import Sample from "./Components/sample";
import { HashRouter, Switch, Route } from "react-router-dom";
import dotsCross from "./assets/DotsCross.png";
import dotsBottom from "./assets/BottomDots.png";
import dotsRight from "./assets/RightSideDots.png";
import dotsTop from "./assets/DotsTop.png";
import { Icon, InlineIcon } from "@iconify/react";
import menuMotion from "@iconify/icons-gg/menu-motion";
import Home from "./Pages/Home/home";

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
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
