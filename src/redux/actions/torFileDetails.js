export const setSelectedTorDetails = (query) => {
  return {
    type: "SETDETAILS",
    payload: query,
  };
};

export const getSelectedTorDetails = () => {
  return {
    type: "GETDETAILS",
  };
};
