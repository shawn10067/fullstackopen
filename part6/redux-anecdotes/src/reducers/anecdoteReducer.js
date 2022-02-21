const getId = () => (100000 * Math.random()).toFixed(0);

const reducer = (state = initialState, action) => {
  let returnState = state;
  switch (action.type) {
    case "VOTE":
      returnState = state.map((val) => {
        if (val.id === action.data.id) {
          val.votes++;
        }
        return val;
      });
      break;
    case "NEW_ANEC":
      const newNote = {
        content: action.data.content,
        id: getId(),
        votes: 0,
      };
      returnState = [...state, newNote];
      break;
    default:
      break;
  }

  return returnState.sort((a, b) => {
    if (a.votes < b.votes) {
      return 1;
    }
    return -1;
  });
};

export const voteNote = (id) => {
  return {
    type: "VOTE",
    data: {
      id: id,
    },
  };
};

export const newAnec = (content) => {
  return {
    type: "NEW_ANEC",
    data: {
      content,
    },
  };
};

export default reducer;
