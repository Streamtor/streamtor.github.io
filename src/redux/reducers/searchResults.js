const searchResults = (state = [], action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "GET":
      return state;
    default:
      return state;
  }
};

export default searchResults;
