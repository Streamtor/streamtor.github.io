const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const express = require("express");
const cors = require("cors");
const TPBAPI = require("thepiratebayapi");
let WebTorrent = require("webtorrent");

let mainWindow;
const server = express();
server.use(cors());
let client = new WebTorrent();

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

server.get("/state", (req, res) => {
  res.json(peerData);
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
