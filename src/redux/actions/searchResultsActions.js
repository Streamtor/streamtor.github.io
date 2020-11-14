export const setSearchResults = (value) => {
  return {
    type: "SET",
    value: value,
  };
};

export const getSearchResults = () => {
  return {
    type: "GET",
  };
};
