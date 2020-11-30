import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./ShowFileList.css";
import Icon from "@iconify/react";
import pathBack from "@iconify/icons-gg/arrow-left";

function formatBytes(a, b = 2) {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  );
}

export default function ShowFileList() {
  const history = useHistory();
  const SearchQuery = useSelector((state) => state.selectedTorFile);
  const fileDetails = useSelector((state) => state.torFileDetails);

  return (
    <div className="search-page-wrapper">
      <span className="back-icon" onClick={() => history.goBack()}>
        <Icon icon={pathBack} style={{ color: "#fff" }} />
        &nbsp;back
      </span>
      <span className="show-file-title">
        <label className="show-file-title-text">{SearchQuery.name}</label>
        <br />
        <div>
          <label className="show-file-title-2">
            Seeders : {SearchQuery.seeders}
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label className="show-file-title-2">
            Leechers : {SearchQuery.leechers}
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label className="show-file-title-2">
            Size : {formatBytes(SearchQuery.size)}
          </label>
        </div>
        <label className="show-file-subtitle">
          Please, Select Only the Video File from the list to Stream it live :)
        </label>
      </span>
      <br />
      {fileDetails.map((file) => (
        <div className="file-detail-card">
          <label className="file-detail-card-title">{file.name}</label>
          <br />
          <label className="file-detail-card-size">
            Size : {formatBytes(file.length)}
          </label>
        </div>
      ))}
    </div>
  );
}
