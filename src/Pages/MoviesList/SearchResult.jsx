import React, { useState } from "react";
import "./SearchResult.css";
import { useSelector } from "react-redux";
import Icon from "@iconify/react";
import pathBack from "@iconify/icons-gg/arrow-left";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTorResults } from "../../redux/actions/torResultAction";
import { setSearchQuery } from "../../redux/actions/searchQueryActions";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/33183-ufo-camping-scene.json";

const baseUrl = "https://image.tmdb.org/t/p/original";
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
export default function SearchResult() {
  const history = useHistory();
  const SearchResults = useSelector((state) => state.searchResult);
  const SearchQuery = useSelector((state) => state.searchQuery);
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

  console.log("SEARCH RESULTS ", SearchResults);

  const handleCardOnClick = async (index) => {
    setIsSearching(true);
    const titleQuery = SearchResults[index].title
      ? SearchResults[index].title
      : SearchResults[index].original_name;
    axios
      .get(`http://localhost:15000/search/${titleQuery}`)
      .then((res) => {
        setIsSearching(false);
        console.log("Tor Search Result : ", res.data);
        dispatch(setSearchQuery(titleQuery));
        dispatch(setTorResults(res.data));
        history.push("/torrent");
      })
      .catch((err) => {
        window.alert("Sorry Scrapping Websites Might Be Down");
        console.log(err);
        history.goBack();
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
          <span className="search-query-title">
            search results for ={">"} <label>{SearchQuery}</label>
          </span>
          <br />
          <div className="grid-container">
            {SearchResults.map((result, index) => (
              <div
                key={index}
                className="result-card-wrapper"
                onClick={() => handleCardOnClick(index)}
              >
                <div className="result-card-left">
                  <img
                    key={result.id}
                    className="result-card-image"
                    src={`${baseUrl}${result.poster_path}`}
                    alt={result.name}
                  />
                </div>
                <div className="result-card-right">
                  <span className="result-card-title">
                    {result.title ? result.title : result.original_name}
                  </span>
                  <span className="result-card-overview">
                    {truncate(result.overview, 150)}
                  </span>
                  <span className="result-card-release-date">
                    {result.release_date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
