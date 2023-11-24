import React, { useContext, useEffect } from 'react';
import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';
import {AuthContext} from '../context/Context';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

function Home(props) {
  const {setUser} = useContext(AuthContext);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } 
    });
  }, [])
  

  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
}

export default Home;
 
