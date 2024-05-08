import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  token: " ",
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.jwtToken;
      state.isAuthenticated = action.payload.authenticated;
    },
    logout: (state) => {
      state.token = " ";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
