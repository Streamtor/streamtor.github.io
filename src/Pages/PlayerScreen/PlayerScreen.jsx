import React, { useEffect } from "react";
import "./PlayerScreen.css";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Icon from "@iconify/react";
import pathBack from "@iconify/icons-gg/arrow-left";
import ReactJWPlayer from "react-jw-player";

export default function PlayerScreen() {
  const history = useHistory();

  const playerSource = useSelector((state) => state.streamURL);
  const onVideoLoad = (event) => {
    console.log("Hello WOlrd");
    console.log("PLAYER SOURCE : ", playerSource);
  };
  useEffect(() => {
    console.log("rendered");
  }, []);
  return (
    <>
      <span
        className="player-screen-back-icon"
        onClick={() => {
          history.goBack();
        }}
      >
        <Icon icon={pathBack} style={{ color: "#fff" }} />
        &nbsp;back
      </span>
      <br />
      <h2>{playerSource.streamName}</h2>
      <div className="video-player-wrapper">
        <video width="320" height="240" controls>
          <source src={playerSource.streamURL} />
          Your browser does not support the video tag.
        </video>
        {/* <ReactJWPlayer
          playerId="my-unique-id"
          onVideoLoad={onVideoLoad}
          playerScript="https://cdn.jwplayer.com/libraries/pUQtdZir.js"
          file={playerSource.streamURL}
        /> */}
        {/* <Player videoId="video-1" className="player">
          <source src={playerSource} />
        </Player> */}
      </div>
    </>
  );
}
