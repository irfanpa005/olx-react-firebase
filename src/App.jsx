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
import ViewPost from './Pages/ViewPost'
import PrivateRoute from './utils/PrivateRoute'
import ErrorPage from './Pages/ErrorPage'
import Favourites from './Pages/Favourites';
import { AuthContext } from './context/Context'
import { auth } from './firebase/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { Post } from './context/PostContext'
import { SearchFunction } from './context/SearchContext';

function App() {

  const {user, setUser} = useContext(AuthContext);
  useEffect(() => {
    onAuthStateChanged(auth, (userLogged) => {
      if (userLogged) {
        setUser(userLogged)
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
        {
          path: "/favourites",
          element: <Favourites />,
        },
      ]
    },
  ]);
  
  return (
    <>
      <Post>
        <SearchFunction>
          <RouterProvider router={router} />
        </SearchFunction>
      </Post>
    </>
  )
}

export default App
