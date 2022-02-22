import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

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
export default messageSlice.reducer;
