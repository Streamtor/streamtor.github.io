import React from "react";
import "./SearchResult.css";
import { useSelector } from "react-redux";

export default function SearchResult() {
  const SearchResults = useSelector((state) => state.searchResult);
  console.log("SEARCH RESULTS ", SearchResults);
  return (
    <div>
      {SearchResults.map((result) => (
        <h2>Title : {result.title ? result.title : result.original_name}</h2>
      ))}
    </div>
  );
}
