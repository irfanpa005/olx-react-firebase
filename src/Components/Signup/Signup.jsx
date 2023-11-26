import React, { useEffect, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useContext } from 'react';
import { FirebaseContext } from '../../context/Context';
import { auth } from '../../firebase/firebaseConfig';
import {  collection, addDoc, getFirestore} from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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
      updateProfile(user,{displayName:username}).then(() => {
        addDoc(userCollectionRef, {
          id:user.uid,
          username:username,
          phone:phoneNo

        }).then(() => {
          navigateTo("/login")
        })
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage); // Log the error details
    });

  }

  useEffect(() => {
    console.log(database)
  }, [])
  


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
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
        <a>Login</a>
      </div>
    </div>
  );
}
