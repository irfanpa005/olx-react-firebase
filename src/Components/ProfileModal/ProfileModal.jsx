import React from 'react'
import './ProfileModal.css'
import CircleUser from '../../assets/CircleUser';
import { useContext } from 'react';
import { AuthContext } from '../../context/Context';
import Heart from "../../assets/Heart";
import LogoutIcon from '../../assets/Logout';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from "firebase/auth";

function ProfileModal() {
  const {user, setUser} = useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userInfo")
      window.location.reload()
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className='profContainer'>
      <div className='profUserDetail' >
          <CircleUser />
          <p className='profModalTitle'>{user.displayName}</p>
      </div>
      <hr className='line'/>
      <div className='profUserMenu'  onClick={() => {navigateTo('/favourites')}}>
        <Heart />
        <p className='profModalTitle' >My ADS</p>
      </div>
      <div className='profUserMenu' onClick={handleSignOut}>
        <LogoutIcon />
        <p className='profModalTitle'>Logout</p>
      </div>
    </div>
  )
}

export default ProfileModal;
