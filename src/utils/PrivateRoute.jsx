import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const stat = false;

  return stat ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
