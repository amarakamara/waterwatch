import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  usageData: [],
};

const usageSlice = createSlice({
  name: "usage",
  initialState,
  reducers: {
    addUsage(state, action) {
      state.usageData = action.payload;
    },
    removeUsage(state) {
      state.usageData = [];
    },
  },
});

export const { addUsage, removeUsage } = usageSlice.actions;

export default usageSlice.reducer;
