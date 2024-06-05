import { createSlice, nanoid } from "@reduxjs/toolkit";

const apiBase =
  import.meta.env.VITE_ENV === "development"
    ? import.meta.env.VITE_DEV_API_BASE
    : import.meta.env.VITE_PROD_API_BASE;

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
