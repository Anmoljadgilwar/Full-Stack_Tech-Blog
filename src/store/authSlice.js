import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: false,
  userData: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.state = true;
      state.userData = action.payload.userData;
    },
  },
});
