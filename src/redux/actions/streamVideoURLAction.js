export const setStreamURL = (query) => {
  return {
    type: "SETSTREAM",
    payload: query,
  };
};

export const getStreamURL = () => {
  return {
    type: "GETSTREAM",
  };
};
