import react from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PrivateRoute from "./privateroutes";

export default function MainRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
