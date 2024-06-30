import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyAlert: false,
  notificationAlert: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setHistoryAlert: (state, action) => {
      state.historyAlert = action.payload;
    },
    setNotificationAlert: (state, action) => {
      state.notificationAlert = action.payload;
    },
  },
});

export const { setHistoryAlert, setNotificationAlert } = alertSlice.actions;

export default alertSlice.reducer;
