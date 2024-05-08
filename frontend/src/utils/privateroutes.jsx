import React from "react";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = () => {
  const { authenticated } = useAuth();
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
