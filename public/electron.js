const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const express = require("express");
const cors = require("cors");
const TPBAPI = require("thepiratebayapi");

let mainWindow;
const server = express();
server.use(cors());

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1040,
    height: 680,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  server.listen(15000, () => {
    console.log("listening on *:15000");
  });
  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.on("ready", createWindow);

/**
 * Express Server Code
 */

server.get("/search/:query", (req, res, next) => {
  let query = req.params.query;
  return TPBAPI.search(query, 200, (torrents) => {
    console.log(torrents);
    res.status(200).json(torrents);
  });
});
