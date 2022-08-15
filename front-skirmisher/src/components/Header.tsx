import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset } from '../features/auth/authSlice'

export const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  // //Automatically authenticate user on page load if token is present
  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getUserDetails())
  //   }
  // } , [dispatch, userToken])

//  let  userInfo = {
//     name: 'John Doe',
//     email: 'wat@mail'
//   }

  return (
   <header className='header'>
      <div className='logo'>
        <NavLink to='/'>GoalSetter</NavLink>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
               Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to='/login'>
                 Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/register'>
                 Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

