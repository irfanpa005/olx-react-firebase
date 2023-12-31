import React, { useState, useContext } from 'react';
import Logo from '../../OLXLogo-black.png';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function Login({setLoginModal,setRegisterModal}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("refreshToken",userCredential.user.refreshToken)
        localStorage.setItem("userInfo",userCredential.user.uid)
        setLoginModal(false)
        navigateTo('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  }

  const handleSignUp = () => {
    setLoginModal(false)
    setRegisterModal(true)
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="100px" src={Logo} style={{margin:"30px 20px"}}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={handleSignUp}>Signup</a>
        <p className='closeX' onClick={() => {setLoginModal(false)}}>X</p>
      </div>
    </div>
  );
}

export default Login;
