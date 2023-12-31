import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../context/Context";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import ChatIcon from "../../assets/ChatIcon";
import Notification from "../../assets/Notification";
import CircleUser from "../../assets/CircleUser";
import ProfileModal from "../ProfileModal/ProfileModal";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

function Header() {
  const { user, setUser } = useContext(AuthContext);
  let userId = localStorage.getItem("userInfo");
  const [profileModal, setProfileModal] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const { searchKey, setSearchKey } = useContext(SearchContext);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const navigateTo = useNavigate();

  const showProfileSection = () => {
    setProfileModal(!profileModal);
  };

  const handleSell = () => {
    if (user) {
      navigateTo("/create");
    } else {
      setLoginModal(true)
    }
  };

  const handleSearch = () => {
    setSearchKey(searchWord);
  };

  const handleLogin = () => {
    setLoginModal(true);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div
          onClick={() => {
            navigateTo("/");
          }}
          className="olxLogo"
        >
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
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
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
        <div>
          <ChatIcon></ChatIcon>
        </div>
        <div>
          <Notification></Notification>
        </div>
        {userId ? (
          <div className="language">
            <CircleUser></CircleUser>
            <Arrow onClick={showProfileSection} />
          </div>
        ) : (
          <span onClick={handleLogin} className="login">
            Login
          </span>
        )}
        <div className="sellMenu" onClick={handleSell}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
      {profileModal && (
        <div className="profileModal">
          <ProfileModal></ProfileModal>
        </div>
      )}
      {loginModal && (
        <div className="loginModal">
          <div className="loginContent">
            <Login
              setLoginModal={setLoginModal}
              setRegisterModal={setRegisterModal}
            ></Login>
          </div>
        </div>
      )}
      {registerModal && (
        <div className="loginModal">
          <div className="loginContent">
            <Signup
              setLoginModal={setLoginModal}
              setRegisterModal={setRegisterModal}
            ></Signup>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
