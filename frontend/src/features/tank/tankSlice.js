import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tankinfo: {},
  pump: false,
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
    updatePump: (state, action) => {
      state.pump = action.payload;
    },
    clearTankData: (state) => {
      state.tankinfo = {};
    },
  },
});

export const { setTankData, clearTankData, updatePump } = tankSlice.actions;

export default tankSlice.reducer;
