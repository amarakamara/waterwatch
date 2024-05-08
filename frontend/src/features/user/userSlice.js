import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      const userInfo = action.payload;
      if (userInfo) {
        state.user = userInfo;
      }
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { getUser, logout } = userSlice.actions; 

export default userSlice.reducer; 
