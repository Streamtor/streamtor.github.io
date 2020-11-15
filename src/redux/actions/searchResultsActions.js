export const setSearchResults = (value) => {
  return {
    type: "SET",
    payload: value,
  };
};

export const getSearchResults = () => {
  return {
    payload: "GET",
  };
};
