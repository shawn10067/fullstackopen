import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notiSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNoti(state, action) {
      return action.payload;
    },
  },
});

export const { setNoti } = notiSlice.actions;

export const setNotification = (message) => {
  return (dispatch) => {
    dispatch(setNoti(message));
    setTimeout(() => dispatch(setNoti("")), 3000);
  };
};
export default notiSlice.reducer;
