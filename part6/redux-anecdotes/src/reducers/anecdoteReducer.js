import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addAnec, getAnec, likeAnec } from "../services/dbFetcher";

const getId = () => (100000 * Math.random()).toFixed(0);

/*
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);
*/
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      let newAnecdotes = state
        .map((val) => {
          if (val.id === id) {
            return {
              ...val,
              votes: val.votes + 1,
            };
          }
          return val;
        })
        .sort((a, b) => {
          if (a.votes < b.votes) {
            return 1;
          }
          return -1;
        });

      return newAnecdotes;
    },
    newAnec(state, action) {
      const newNote = {
        content: action.payload,
        id: getId(),
        votes: 0,
      };

      let newState = state.sort((a, b) => {
        if (a.votes < b.votes) {
          return 1;
        }
        return -1;
      });
      newState.push(newNote);
      return newState;
    },
    setAnec(state, action) {
      return action.payload.sort((a, b) => {
        if (a.votes < b.votes) {
          return 1;
        }
        return -1;
      });
    },
    appendAnec(state, action) {
      let newState = state.sort((a, b) => {
        if (a.votes < b.votes) {
          return 1;
        }
        return -1;
      });
      newState.push(action.payload);
      return newState;
    },
  },
});

export const { vote, newAnec, setAnec, appendAnec } = anecdoteSlice.actions;

export const addAnecdote = (content) => {
  return async (dispatch) => {
    let newAnecdote = await addAnec(content);
    dispatch(appendAnec(newAnecdote));
  };
};

export const getAnnecdotes = () => {
  return async (dispatch) => {
    let anecs = await getAnec();

    dispatch(setAnec(anecs));
  };
};

export const voteAnnecdote = (id, content, likes) => {
  return async (dispatch) => {
    let newAnnec = await likeAnec(id, content, likes);
    dispatch(vote(id));
  };
};

export default anecdoteSlice.reducer;
