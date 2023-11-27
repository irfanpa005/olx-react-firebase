import React, {useEffect, useContext} from 'react'
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/Login'
import CreatePage from './Pages/Create'
import { AuthContext } from './context/Context'
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";

function App() {

  const {user, setUser} = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        setUser(userLogged)
      } 
    });
  })
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup /> }/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
