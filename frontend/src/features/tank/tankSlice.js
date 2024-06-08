import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tankinfo: {},
};

export const tankSlice = createSlice({
  name: "tank",
  initialState,
  reducers: {
    setTankData: (state, action) => {
      const data = action.payload;
      if (data) {
        state.tankinfo = data;
      }
    },
    clearTankData: (state) => {
      state.tankinfo = {};
    },
  },
});

export const { setTankData, clearTankData } = tankSlice.actions;

export default tankSlice.reducer;
