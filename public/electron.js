const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const express = require("express");
const cors = require("cors");
const TPBAPI = require("thepiratebayapi");
let WebTorrent = require("webtorrent");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
log.variables.label = "dev";
log.transports.console.format = "[{h}:{i}:{s}.{ms}] [{label}] {text}";

let mainWindow;
const server = express();
server.use(cors());
let client = new WebTorrent();
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1040,
    height: 680,
    show: false,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  server.listen(15000, () => {
    console.log("listening on *:15000");
    log.info("listening on *:15000");
  });

  const startURL = `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);
  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  autoUpdater.checkForUpdatesAndNotify();
}

/**
 *  Auto updates
 */
const sendStatusToWindow = (text) => {
  console.log(text);
  log.info(text);
};

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", (err) => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on("download-progress", (progressObj) => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on("update-downloaded", (info) => {
  sendStatusToWindow("Update downloaded; will install now");
});

autoUpdater.on("update-downloaded", (info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 500 ms.
  // You could call autoUpdater.quitAndInstall(); immediately
  autoUpdater.quitAndInstall();
});

app.on("ready", createWindow);
// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 *  Log ISSUE RECORDING
 */

log.catchErrors({
  showDialog: false,
  onError(error, versions, submitIssue) {
    electron.dialog
      .showMessageBox({
        title: "An error occurred",
        message: error.message,
        detail: error.stack,
        type: "error",
        buttons: ["Ignore", "Report", "Exit"],
      })
      .then((result) => {
        if (result.response === 1) {
          submitIssue("https://github.com/Streamtor/streamtor/issues/new", {
            title: `Error report for ${versions.app}`,
            body:
              "Error:\n```" + error.stack + "\n```\n" + `OS: ${versions.os}`,
          });
          return;
        }

        if (result.response === 2) {
          electron.app.quit();
        }
      });
  },
});

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

server.get("/add/:torrentId", function (req, res) {
  let torrentId = "magnet:?xt=urn:btih:" + req.params.torrentId;
  console.log("MAGNET : ", torrentId);
  var tor = client.get(torrentId);
  if (tor == null) {
    client.add(torrentId, function (torrent) {
      let files = [];
      console.log("Entered");
      torrent.files.forEach(function (data) {
        files.push({
          name: data.name,
          length: data.length,
        });
      });
      res.status(200);
      res.json(files);
    });
  } else {
    let files = [];
    tor.files.forEach(function (data) {
      files.push({
        name: data.name,
        length: data.length,
      });
    });
    res.status(200);
    res.json(files);
  }
});

server.get("/stream/:torrentId/:file_name", async function (req, res, next) {
  let torrentId = "magnet:?xt=urn:btih:" + req.params.torrentId;
  console.log(torrentId, "file : ", req.params.file_name);
  console.log("TIDs, ", client.torrents);
  var tor = client.get(torrentId);
  if (tor == null) {
    console.log("entered null state");
    client.add(torrentId, function (torrent) {
      console.log("torrent Set");
      tor = torrent;
      let file = {};
      console.log(tor.files);
      for (i = 0; i < tor.files.length; i++) {
        if (tor.files[i].name == req.params.file_name) {
          file = tor.files[i];
        }
      }
      let range = req.headers.range;
      console.log("range: ", range);
      if (!range) {
        let err = new Error("Wrong range");
        err.status = 416;
        return next(err);
      }
      let positions = range.replace(/bytes=/, "").split("-");
      let start = parseInt(positions[0], 10);
      let file_size = file.length;
      let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
      let chunksize = end - start + 1;
      let head = {
        "Content-Range": "bytes " + start + "-" + end + "/" + file_size,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      let stream_position = {
        start: start,
        end: end,
      };
      let stream = file.createReadStream(stream_position);
      stream.pipe(res);
      stream.on("error", function (err) {
        return next(err);
      });
    });
  } else {
    let file = {};
    console.log(tor.files);
    for (i = 0; i < tor.files.length; i++) {
      if (tor.files[i].name == req.params.file_name) {
        file = tor.files[i];
      }
    }
    let range = req.headers.range;
    console.log("range: ", range);
    if (!range) {
      let err = new Error("Wrong range");
      err.status = 416;
      return next(err);
    }
    let positions = range.replace(/bytes=/, "").split("-");
    let start = parseInt(positions[0], 10);
    let file_size = file.length;
    let end = positions[1] ? parseInt(positions[1], 10) : file_size - 1;
    let chunksize = end - start + 1;
    let head = {
      "Content-Range": "bytes " + start + "-" + end + "/" + file_size,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    let stream_position = {
      start: start,
      end: end,
    };
    let stream = file.createReadStream(stream_position);
    stream.pipe(res);
    stream.on("error", function (err) {
      return next(err);
    });
  }
});

server.get("/remove/:torrentId", (req, res) => {
  let torrentId = "magnet:?xt=urn:btih:" + req.params.torrentId;
  console.log(torrentId);
  client.remove(torrentId, function () {
    console.log("Torent Removed");
    res.status(200);
    res.end();
  });
});
server.get("/state", (req, res) => {
  res.json(peerData);
});
