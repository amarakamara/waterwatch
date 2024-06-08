import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  token: " ",
  userId: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.jwtToken;
      state.isAuthenticated = action.payload.authenticated;
      state.userId = action.payload.uid;
    },
    logout: (state) => {
      state.token = " ";
      state.isAuthenticated = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
