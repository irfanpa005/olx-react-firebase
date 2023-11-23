import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/Login'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup /> }/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
