import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import windowReducer from "../features/windows/windowSlice";
import tankReducer from "../features/tank/tankSlice";
import usageReducer from "../features/usage/usageSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  windows: windowReducer,
  tank: tankReducer,
  usage: usageReducer,
});

export default rootReducer;
