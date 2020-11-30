export const setTorResults = (value) => {
  return {
    type: "SETTORENT",
    payload: value,
  };
};

export const getTorResults = () => {
  return {
    payload: "GETTORENT",
  };
};
