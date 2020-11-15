export const setSearchQuery = (query) => {
  return {
    type: "SETSEARCH",
    payload: query,
  };
};

export const getSearchQuery = () => {
  return {
    type: "GETSEARCH",
  };
};
