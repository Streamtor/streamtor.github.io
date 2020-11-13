import React from "react";
import "./home.css";
import { Icon, InlineIcon } from "@iconify/react";
import searchIcon from "@iconify/icons-ei/search";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/33598-hammock.json";

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <div className="Home-Wrapper">
        <span className="home-welcome-text">Hi Streamer</span>
        <span className="home-welcome-sub-text">
          Welcome Back to the workspace, we missed You!
        </span>
        <div className="home-search-wrapper">
          <input className="home-search-box" placeholder="Search for a movie" />
          <div className="home-search-icon-wrapper">
            <Icon
              className="home-search-icon"
              icon={searchIcon}
              style={{ color: "#fff" }}
            />
          </div>
        </div>
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
