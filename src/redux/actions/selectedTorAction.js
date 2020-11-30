export const setSelectedTor = (query) => {
  return {
    type: "SETFILE",
    payload: query,
  };
};

export const getSelectedTor = () => {
  return {
    type: "GETFILE",
  };
};
