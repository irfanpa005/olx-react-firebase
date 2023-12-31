import React, { useEffect, useState } from 'react';
import Logo from '../../OLXLogo-black.png';
import './Signup.css';
import { useContext } from 'react';
import { FirebaseContext } from '../../context/Context';
import { auth } from '../../firebase/firebaseConfig';
import {  collection, addDoc, getFirestore} from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Signup({setLoginModal,setRegisterModal}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const {firebaseApp} = useContext(FirebaseContext);
  const database = getFirestore(firebaseApp);
  const userCollectionRef = collection(database,'users');

  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      toast.success("Registration Succesfull")
      updateProfile(user,{displayName:username}).then(() => {
        addDoc(userCollectionRef, {
          id:user.uid,
          username:username,
          phone:phoneNo,
          favourited:[]
        }).then(() => {
          setRegisterModal(false)
        })
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)// Log the error details
    });

  }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="100px" src={Logo} style={{margin:"30px 20px"}}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="userName"
            name="username"
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder='email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="phoneNo">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phoneNO"
            name="phone"
            placeholder='phone number'
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder='enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={() => {setRegisterModal(false); setLoginModal(true)}}>Login</a>
        <p className='closeX' onClick={() => {setRegisterModal(false)}}>X</p>
      </div>
    </div>
  );
}
