import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const store = configureStore({
  reducer: {
    todos: store,
  },
});

export default store;
