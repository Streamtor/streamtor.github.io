const searchResults = (state = [], action) => {
  switch (action.type) {
    case "SET":
      return action.value;
    case "GET":
      return state;
    default:
      return state;
  }
};

export default searchResults;
