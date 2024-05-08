import react from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./privateroutes";

export default function MainRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/home" element={<PrivateRoute />} />
      </Route>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
