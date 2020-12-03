import "./App.css";
import React, { useEffect, useState } from "react";
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
import PlayerScreen from "./Pages/PlayerScreen/PlayerScreen";
import TitleBar from "frameless-titlebar";
import { remote, ipcRenderer } from "electron";

const { NEW_UPATE_FOUND, PING_GORUND } = require("./utils/constants");
function App() {
  // manage window state, default to currentWindow maximized state
  const currentWindow = remote.getCurrentWindow();
  const [maximized, setMaximized] = useState(currentWindow.isMaximized());
  const [updateFound, setUpdateFound] = useState(false);

  useEffect(() => {
    console.log(ipcRenderer.sendSync(PING_GORUND, "ping")); // prints "pong"
    console.log("IPC OPEN");
    ipcRenderer.on("message", (event, arg) => {
      console.log("GOT : ", arg);
    });
    return () => {};
  }, [ipcRenderer]);

  const handleUpdateViewer = (event, arg) => {
    console.log("NEW UPDATE FOUND : ", arg, " EVENT : ", event);
    setUpdateFound(true);
  };
  // used by double click on the titlebar
  // and by the maximize control button
  const handleMaximize = () => {
    console.log("MAX VALUE : ", maximized);
    if (maximized) {
      currentWindow.unmaximize();
    } else {
      currentWindow.maximize();
    }
    setMaximized(!maximized);
  };

  return (
    <div className="App">
      <TitleBar
        app="Streamtor"
        title="Streamtor"
        currentWindow={currentWindow} // electron window instance
        platform={process.platform}
        // menu={menu}
        onClose={() => currentWindow.close()}
        onMinimize={() => currentWindow.minimize()}
        onMaximize={handleMaximize}
        // when the titlebar is double clicked
        onDoubleClick={handleMaximize}
        disableMinimize={false}
        // disableMaximize={false}
        maximized={maximized}
        theme={{
          bar: {
            palette: "dark",
            height: "28px",
            color: "#fff",
            background: "rgb(36, 51, 65)",
            borderBottom: "",
            inActiveOpacity: 0.6,
            borderRadius: "30px",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif",
            icon: {
              color: "#0372ef",
              width: 18,
              height: 18,
            },
            title: {
              color: "inherit",
              align: "center",
              fontFamily: "Montserrat Alternates",
              fontWeight: "normal",
            },
            button: {
              maxWidth: 100,
              disabledOpacity: 0.3,
              active: {
                color: "#fff",
                background: "#303030",
              },
              default: {
                color: "inherit",
                background: "transparent",
              },
              hover: {
                color: "inherit",
                background: "rgba(255,255,255,0.3)",
              },
            },
          },
          controls: {
            border: "none",
            layout: "right",
            borderRadius: 10,
            normal: {
              default: {
                color: "inherit",
                background: "transparent",
              },
              hover: {
                color: "#fff",
                background: "rgba(255,255,255,0.3)",
              },
            },
            close: {
              default: {
                color: "inherit",
                background: "transparent",
              },
              hover: {
                color: "#fff",
                background: "#e81123",
              },
            },
          },
          menu: {
            palette: "dark",
            style: "default",
            borderRadius: 10,
            item: {
              height: 30,
              disabledOpacity: 0.3,
              default: {
                color: "inherit",
                background: "transparent",
              },
              active: {
                color: "#fff",
                background: "rgb(241, 146, 95)",
              },
            },
            separator: {
              color: "#e1e4e8",
            },
            header: {
              show: true,
              color: "#6a737d",
            },
            accelerator: {
              color: "#6a737d",
            },
            icon: {
              highlight: true,
            },
            list: {
              minWidth: 200,
              maxWidth: 400,
              marginBottom: 10,
              background: "#303030",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              zIndex: 2001,
            },
            overlay: {
              background: "black",
              opacity: 0.4,
              zIndex: 2000,
            },
            marginRight: 0,
          },
        }}
      />
      <img src={dotsCross} className="dots-left" />
      <img src={dotsBottom} className="dots-bottom" />
      {/* <img src={dotsRight} className="dots-right" /> */}
      <img src={dotsTop} className="dots-top" />
      <div className="app-menu-icon-wrapper">
        <div className="app-menu-icon">
          <Icon icon={menuMotion} style={{ color: "#fff" }} />
        </div>
      </div>
      <div>
        <span className="App-title">STREAMTOR</span>
      </div>
      {updateFound ? (
        <div>UPDATE FOUND</div>
      ) : (
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
            <Route path="/play">
              <PlayerScreen />
            </Route>
          </Switch>
        </HashRouter>
      )}
    </div>
  );
}

export default App;
