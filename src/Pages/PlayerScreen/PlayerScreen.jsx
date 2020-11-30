import React from "react";
import "./PlayerScreen.css";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "@iconify/react";
import pathBack from "@iconify/icons-gg/arrow-left";

export default function PlayerScreen() {
  const history = useHistory();
  const playerSource = useSelector((state) => state.streamURL);

  return (
    <>
      <span
        className="player-screen-back-icon"
        onClick={() => history.goBack()}
      >
        <Icon icon={pathBack} style={{ color: "#fff" }} />
        &nbsp;back
      </span>
      <br />
      <div className="video-player-wrapper">
        <Player videoId="video-1">
          <source src={playerSource} />
        </Player>
      </div>
    </>
  );
}
