import { configureStore } from "@reduxjs/toolkit";
import anecReducer from "./reducers/anecdoteReducer";
import notiReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

let store = configureStore({
  reducer: {
    anecReducer,
    notiReducer,
    filterReducer,
  },
});

export default store;
