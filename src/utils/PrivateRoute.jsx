import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {

  let refreshToken = localStorage.getItem("refreshToken")
  let userInfo = localStorage.getItem("userInfo")

  return refreshToken && userInfo ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
