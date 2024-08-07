import react from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Notification from "../pages/Notification";
import History from "../pages/History";
import Prediction from "../pages/Prediction";
import Setting from "../pages/Setting";
import ForgotPassword from "../pages/ForgotPassword";
import TokenSent from "../pages/TokenSent";
import NewPassword from "../pages/NewPassword";
import ResetSuccessful from "../pages/ResetSuccessful";
import PrivateRoute from "./privateroutes";

export default function MainRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/history" element={<History />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/tokensent" element={<TokenSent />} />
      <Route path="/newpassword/:token" element={<NewPassword />} />
      <Route path="/resetsuccessful" element={<ResetSuccessful />} />
    </Routes>
  );
}
