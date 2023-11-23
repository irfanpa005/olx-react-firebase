import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { firebaseContext } from './context/firebaseContext.jsx'
import {firebaseApp} from './firebase/firebaseConfig'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <firebaseContext.Provider value={{firebaseApp}}>
      <App />
    </firebaseContext.Provider>
  </React.StrictMode>,
)
