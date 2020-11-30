const torrentFile = (state = [], action) => {
  switch (action.type) {
    case "SETFILE":
      return action.payload;
    case "GETFILE":
      return state;
    default:
      return state;
  }
};

export default torrentFile;
