const torrentResults = (state = [], action) => {
  switch (action.type) {
    case "SETTORENT":
      return action.payload;
    case "GETTORENT":
      return state;
    default:
      return state;
  }
};

export default torrentResults;
