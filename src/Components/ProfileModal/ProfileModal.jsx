import React from 'react'
import './ProfileModal.css'
import CircleUser from '../../assets/CircleUser';
import { useContext } from 'react';
import { AuthContext } from '../../context/Context';
import Heart from "../../assets/Heart";
import LogoutIcon from '../../assets/Logout';

function ProfileModal() {
  const {user, setUser} = useContext(AuthContext);

  return (
    <div className='profContainer'>
      <div className='profUserDetail' >
          <CircleUser />
          <p className='userName'>{user.displayName}</p>
      </div>
      <hr className='line'/>
      <div className='profUserDetail'>
        <Heart />
        <p className='userName'>My ADS</p>
      </div>
      <div className='profUserDetail'>
        <LogoutIcon />
        <p className='userName'>Logout</p>
      </div>
    </div>
  )
}

export default ProfileModal;
