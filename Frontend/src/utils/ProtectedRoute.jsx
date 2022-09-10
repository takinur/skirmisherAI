import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from "../features/auth/authSlice"

import { Link, Outlet } from 'react-router-dom'
import Navbar from "../components/NavBar"


const ProtectedRoute = () => {
  const dispatch = useDispatch();

  const { user, authToken } = useSelector((state) => state.auth);
  //Automatically authenticate user if token is present
  useEffect(() => {
    if (authToken && !user) {
      dispatch(getUserDetails());
    }
  }, [authToken, dispatch]);

  //TODO: Add a loading screen


  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <div className='h-screen bg-gray-200 text-center'>
        <Navbar />
        <h1>Unauthorized :(</h1>
        <span>
          <Link to='/login'>Login</Link> to gain access
        </span>
      </div>
    )
  }
  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute