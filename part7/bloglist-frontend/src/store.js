import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notiReducer from "./reducers/notiReducer";

let store = configureStore({
  reducer: {
    blogReducer,
    userReducer,
    notiReducer,
  },
});

export default store;
