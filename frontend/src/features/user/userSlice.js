import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userinfo: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const data = action.payload;
      if (data) {
        state.userinfo = data;
      }
    },
    removeUserInfo: (state) => {
      state.userinfo = {};
    },
  },
});

export const { setUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;
