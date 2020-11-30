import React, { useState } from "react";
import "./TorrentList.css";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import animationData from "../../assets/lotties/33183-ufo-camping-scene.json";
import Icon from "@iconify/react";
import pathBack from "@iconify/icons-gg/arrow-left";
import { useHistory } from "react-router-dom";

export default function TorrentList() {
  const history = useHistory();
  const SearchQuery = useSelector((state) => state.searchQuery);
  const torResults = useSelector((state) => state.torResult);

  const [isSearching, setIsSearching] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
              <div key={index} className="tor-grid-element">
                <span className="tor-grid-element-title">{result.name}</span>
                <p>{result.leechers}</p>
                <p>{result.seeders}</p>
                <p>{result.size}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
