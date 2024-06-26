import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  historyData: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory(state, action) {
      state.historyData = action.payload;
    },
    removeHistory: (state, action) => {
      state.historyData = state.historyData.filter(
        (entry) => entry._id !== action.payload
      );
    },
  },
});

export const { addHistory, removeHistory } = historySlice.actions;

export default historySlice.reducer;
