import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
let timeoutId = 0;

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    removeMessage(state, action) {
      return "";
    },
  },
});

export const { setMessage, removeMessage } = messageSlice.actions;

export const createMessage = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(removeMessage());
    }, 1000 * seconds);
  };
};

export default messageSlice.reducer;
