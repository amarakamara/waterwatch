import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notificationData: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notificationData = action.payload;
    },
    removeNotification: (state, action) => {
      state.notificationData = state.notificationData.filter(
        (entry) => entry._id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
