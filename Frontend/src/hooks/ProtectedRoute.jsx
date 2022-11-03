import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../features/auth/authSlice'

import { Link, Outlet } from 'react-router-dom'
import GuestHeader from '../components/Header'
import UnauthorizedAccess from '../pages/Error/403'

const ProtectedRoute = () => {
  const dispatch = useDispatch()

  const { user, authToken } = useSelector((state) => state.auth)
  //Automatically authenticate user if token is present
  useEffect(() => {
    if (authToken && !user) {
      dispatch(getUserDetails())
    }
  }, [authToken, dispatch])

  //TODO: Add a loading screen

  // show unauthorized screen if no user is found in redux store
  if (!user) {
    return (
      <div className="h-screen bg-gray-200 text-center">
        <GuestHeader>
          <Link
            to="/login"
            className="-mt-1 block rounded-full border-2 border-[#7510F7] py-2 px-6 text-sm font-semibold text-[#7510F7] shadow-md hover:bg-[#7510F7] hover:text-white md:inline-block"
          >
            Sign In
          </Link>
        </GuestHeader>
        <UnauthorizedAccess />
      </div>
    )
  }
  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute
