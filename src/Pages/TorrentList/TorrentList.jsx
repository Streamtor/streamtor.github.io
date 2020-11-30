import React, { useState } from "react";
import "./TorrentList.css";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import animationData from "../../assets/lotties/33183-ufo-camping-scene.json";
import Icon from "@iconify/react";
import pathBack from "@iconify/icons-gg/arrow-left";
import playCircleFilled from "@iconify/icons-ant-design/play-circle-filled";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedTor } from "../../redux/actions/selectedTorAction";
import { setSelectedTorDetails } from "../../redux/actions/torFileDetails";
import Axios from "axios";

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

export default function TorrentList() {
  const history = useHistory();
  const SearchQuery = useSelector((state) => state.searchQuery);
  const torResults = useSelector((state) => state.torResult);
  const dispatch = useDispatch();

  const [isSearching, setIsSearching] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCardClick = (index) => {
    console.log(torResults[index]);
    let url = "http://localhost:15000/add/" + torResults[index].info_hash;
    dispatch(setSelectedTor(torResults[index]));
    setIsSearching(true);
    Axios.get(url).then((res) => {
      console.log(res.data);
      dispatch(setSelectedTorDetails(res.data));
      setIsSearching(false);
      history.push("/file");
    });
  };

  return (
    <div className="search-page-wrapper">
      {isSearching ? (
        <div>
          <span>Fetching Magnets for your searched query...</span>
          <br />
          <br />
          <Lottie
            options={defaultOptions}
            style={{
              borderRadius: 20,
            }}
            height={125}
            width={200}
          />
        </div>
      ) : (
        <>
          <span className="back-icon" onClick={() => history.goBack()}>
            <Icon icon={pathBack} style={{ color: "#fff" }} />
            &nbsp;back
          </span>
          <span className="tor-search-query-title">
            <label className="search-title">{SearchQuery}</label>
            <br />
            <label className="tor-search-subtitle">
              Please select a movie with maximum seeders for better experience
            </label>
          </span>
          <br />
          <div className="tor-grid-container tor-grid-container--fit">
            {torResults.map((result, index) => (
              <div
                key={index}
                className="tor-grid-element"
                onClick={() => handleCardClick(index)}
              >
                <span className="tor-grid-element-title">{result.name}</span>
                <div className="alignleft">
                  <label className="seeders-leechers-text">Seeders</label>
                  <br />
                  <label className="seeders-leechers-value">
                    {result.seeders}
                  </label>
                  <label className="movie-size-value">
                    {formatBytes(result.size)}
                  </label>
                </div>
                <div className="alignright">
                  <label className="seeders-leechers-text">Leechers</label>
                  <br />
                  <label className="seeders-leechers-value">
                    {result.leechers}
                  </label>
                  <div className="movie-select-icon">
                    <Icon
                      icon={playCircleFilled}
                      style={{ color: "#fff", width: "50px", height: "50px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
