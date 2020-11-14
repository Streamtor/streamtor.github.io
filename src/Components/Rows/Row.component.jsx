import React, { useEffect, useState } from "react";
import "./Row.styles.css";
import axios from "../../Middlewares/axios";

const baseUrl = "https://image.tmdb.org/t/p/original";
export default function Row({ fetchUrl }) {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log("DATA : ", request.data);
      setCardData(request.data?.results);
    }
    fetchData();
    return () => {};
  }, [fetchUrl]);
  return (
    <div className="row">
      <div className="row_posters">
        {cardData.map((data) => (
          <img
            key={data.id}
            className={`row_poster row_posterLarge posters`}
            src={`${baseUrl}${data.poster_path}`}
            alt={data.name}
          />
        ))}
      </div>
      <span className="home-hint-text">
        Scroll to see more! If unable to scroll press down shift and then scroll
        :)
      </span>
    </div>
  );
}
