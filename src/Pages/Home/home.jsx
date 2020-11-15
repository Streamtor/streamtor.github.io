import React, { useState } from "react";
import "./home.css";
import { Icon } from "@iconify/react";
import searchIcon from "@iconify/icons-ei/search";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/33598-hammock.json";
import Row from "../../Components/Rows/Row.component";
import requests from "../../Middlewares/requests";
import axios from "../../Middlewares/axios";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../redux/actions/searchResultsActions";
import { useHistory } from "react-router-dom";
import { setSearchQuery } from "../../redux/actions/searchQueryActions";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Trending");
  const [queryMovie, setQueryMovie] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleGenreClick = (value) => {
    setSelectedGenre(value);
  };

  const handleQuerySearch = async () => {
    console.log("Query Being searched ! ", queryMovie);
    const request = await axios.get(requests.searchMulti + queryMovie);
    console.log("Search Query Result : ", request.data.results);
    dispatch(setSearchQuery(queryMovie));
    dispatch(setSearchResults(request.data.results));
    history.push("/search");
  };

  const handlePosterClick = async (data) => {
    const searchQuery = data.name ? data.name : data.original_title;
    console.log("Poster Click ", searchQuery);
    const request = await axios.get(requests.searchMulti + searchQuery);
    console.log("Poster Click Result : ", request.data.results);
    dispatch(setSearchQuery(searchQuery));
    dispatch(setSearchResults(request.data.results));
    history.push("/search");
  };

  return (
    <div>
      <div className="Home-Wrapper">
        <span className="home-welcome-text">Hi Streamer</span>
        <span className="home-welcome-sub-text">
          Welcome Back to the workspace, we missed You!
        </span>
        <div className="home-search-wrapper">
          <input
            className="home-search-box"
            placeholder="Search the movie"
            onChange={(event) => {
              setQueryMovie(event.target.value);
            }}
          />
          <div className="home-search-icon-wrapper" onClick={handleQuerySearch}>
            <Icon
              className="home-search-icon"
              icon={searchIcon}
              style={{ color: "#fff" }}
            />
          </div>
        </div>
        <span className="home-movies-category-title animated fadeIn">
          {selectedGenre}
        </span>
        <div>
          {selectedGenre === "Trending" && (
            <Row
              fetchUrl={requests.fetchTrending}
              onPosterClick={handlePosterClick}
            />
          )}
          {selectedGenre === "Comedy Movies" && (
            <Row
              fetchUrl={requests.fetchComedyMovies}
              onPosterClick={handlePosterClick}
            />
          )}
          {selectedGenre === "Series" && (
            <Row
              fetchUrl={requests.fetchNetflixOriginals}
              onPosterClick={handlePosterClick}
            />
          )}
          {selectedGenre === "Top Rated" && (
            <Row
              fetchUrl={requests.fetchTopRated}
              onPosterClick={handlePosterClick}
            />
          )}
          {selectedGenre === "Horror Movies" && (
            <Row
              fetchUrl={requests.fetchHorrorMovies}
              onPosterClick={handlePosterClick}
            />
          )}
        </div>
      </div>
      <div className="home-movies-category-wrapper">
        <div className="home-divider" />
        <ul className="unstyled-list">
          <li
            className={
              selectedGenre === "Trending"
                ? "list-text selected-genre"
                : "list-text"
            }
            onClick={() => handleGenreClick("Trending")}
          >
            Trending
          </li>
          <li
            className={
              selectedGenre === "Top Rated"
                ? "list-text selected-genre"
                : "list-text"
            }
            onClick={() => handleGenreClick("Top Rated")}
          >
            Top Rated
          </li>
          <li
            className={
              selectedGenre === "Series"
                ? "list-text selected-genre"
                : "list-text"
            }
            onClick={() => handleGenreClick("Series")}
          >
            Series
          </li>
          <li
            className={
              selectedGenre === "Comedy Movies"
                ? "list-text selected-genre"
                : "list-text"
            }
            onClick={() => handleGenreClick("Comedy Movies")}
          >
            Comedy Movies
          </li>
          <li
            className={
              selectedGenre === "Horror Movies"
                ? "list-text selected-genre"
                : "list-text"
            }
            onClick={() => handleGenreClick("Horror Movies")}
          >
            Horror Movies
          </li>
        </ul>
      </div>
      <div className="lottie-animation-wrapper">
        <Lottie
          options={defaultOptions}
          style={{
            borderRadius: 20,
          }}
          height={125}
          width={200}
        />
      </div>
    </div>
  );
}
