import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails } from '../features/auth/authSlice'

import { Link, Outlet } from 'react-router-dom'
import UnauthorizedAccess from '../pages/Error/403'
import GuestLayout from '../pages/Layout/Guest'

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
      <GuestLayout>
        <UnauthorizedAccess />
      </GuestLayout>
    )
  }
  // returns child route elements
  return <Outlet />
}
export default ProtectedRoute
