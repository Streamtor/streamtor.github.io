const streamFile = (state = [], action) => {
  switch (action.type) {
    case "SETSTREAM":
      return action.payload;
    case "GETSTREAM":
      return state;
    default:
      return state;
  }
};

export default streamFile;
