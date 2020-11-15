const searchQuery = (state = "", action) => {
  switch (action.type) {
    case "SETSEARCH":
      return action.payload;
    case "GETSEARCH":
      return state;
    default:
      return state;
  }
};

export default searchQuery;
