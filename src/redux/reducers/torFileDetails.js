const torFileDetails = (state = [], action) => {
  switch (action.type) {
    case "SETDETAILS":
      return action.payload;
    case "GETDETAILS":
      return state;
    default:
      return state;
  }
};

export default torFileDetails;
