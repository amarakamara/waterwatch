import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  showProfile: false,
};

export const windowSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    openProfile: (state) => {
      state.showProfile = true;
    },
    closeProfile: (state) => {
      state.showProfile = false;
    },
  },
});

export const { openProfile, closeProfile } = windowSlice.actions;

export default windowSlice.reducer;
