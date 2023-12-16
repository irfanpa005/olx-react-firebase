import React, {useEffect, useContext} from 'react'
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import {
  RouterProvider,
  createBrowserRouter,
  Navigate
} from "react-router-dom";
import LoginPage from './Pages/Login'
import CreatePage from './Pages/Create'
import { AuthContext } from './context/Context'
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import ViewPost from './Pages/ViewPost'
import { Post } from './context/PostContext'
import PrivateRoute from './utils/PrivateRoute'
import ErrorPage from './Pages/ErrorPage'

function App() {

  const {user, setUser} = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        setUser(userLogged)
        console.log(user)
      } 
    });
  })

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/view",
      element: <ViewPost />,
    },
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        {
          path: "/create",
          element: <CreatePage />,
        },
      ]
    },
  ]);
  
  return (
    <>
      {/* <Post>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<Signup /> }/>
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/create' element={<CreatePage />} />
            <Route path='/view' element={<ViewPost />} />
          </Routes>
        </BrowserRouter>
      </Post> */}
      <Post>
        <RouterProvider router={router} />
      </Post>
    </>
  )
}

export default App
