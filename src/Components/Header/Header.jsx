import React, { useContext, useState } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../context/Context';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";


function Header() {
  const {user, setUser} = useContext(AuthContext);
  const [searchKey, setSearchKey] = useState("")
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("userInfo")
      navigateTo('/login')
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleSell= () => {
    navigateTo('/create')
  }

  const handleSearch = () => {
    console.log(searchKey)
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>
          <div className="searchAction" onClick={handleSearch}>
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage" >
          <span onClick={() => {navigateTo('/login')}}>{user ? `Welcome,${user.displayName}` : "Login"}</span>
          <hr />
        </div>
        { user && <span className="signOutButton" onClick={handleSignOut}>Logout</span> }
        <div className="sellMenu" onClick={handleSell}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
