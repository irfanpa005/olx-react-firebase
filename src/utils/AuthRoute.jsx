import React, { useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute() {
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        localStorage.getItem("refreshToken") || "";
        let userInfo = localStorage.getItem("userInfo");
    }, [])
    
  return refreshToken && refreshToken.length > 0 ?
    <Navigate to={'/'}/> :
    <Navigate to={'login'}/>
}

export default AuthRoute
