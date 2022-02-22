import { configureStore } from "@reduxjs/toolkit";
import anecReducer from "./reducers/anecdoteReducer";
import notiReducer from "./reducers/notificationReducer";

let store = configureStore({
  reducer: {
    anecReducer,
    notiReducer,
  },
});

export default store;
