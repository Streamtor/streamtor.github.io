import React, { useState } from "react";
import "./home.css";
import { Icon, InlineIcon } from "@iconify/react";
import searchIcon from "@iconify/icons-ei/search";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/33598-hammock.json";
import Row from "../../Components/Rows/Row.component";
import requests from "../../Middlewares/requests";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("Trending");

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

  return (
    <div>
      <div className="Home-Wrapper">
        <span className="home-welcome-text">Hi Streamer</span>
        <span className="home-welcome-sub-text">
          Welcome Back to the workspace, we missed You!
        </span>
        <div className="home-search-wrapper">
          <input className="home-search-box" placeholder="Search the movie" />
          <div className="home-search-icon-wrapper">
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
            <Row fetchUrl={requests.fetchTrending} />
          )}
          {selectedGenre === "Comedy Movies" && (
            <Row fetchUrl={requests.fetchComedyMovies} />
          )}
          {selectedGenre === "Series" && (
            <Row fetchUrl={requests.fetchNetflixOriginals} />
          )}
          {selectedGenre === "Top Rated" && (
            <Row fetchUrl={requests.fetchTopRated} />
          )}
          {selectedGenre === "Horror Movies" && (
            <Row fetchUrl={requests.fetchHorrorMovies} />
          )}
        </div>
      </div>
      <div className="home-movies-category-wrapper">
        <div className="home-divider" />
        <ul className="unstyled-list">
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
