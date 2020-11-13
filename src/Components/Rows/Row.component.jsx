import React, { useEffect, useState } from "react";
import "./Row.styles.css";
import axios from "../../Middlewares/axios";

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
  return <div>Row Component</div>;
}
