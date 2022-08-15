import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import { getUserDetails } from '../__helpers/userActions'

export const Header = () => {

  const {userInfo, userToken } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  //Automatically authenticate user on page load if token is present
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails())
    }
  } , [dispatch, userToken])

  return (
    <>
    <span> { userInfo ?  `Logged in as ${userInfo.email}` : "You're not logged in"}</span>
      <div>
        {userInfo ? ( <button> Logout</button>) : ( <NavLink to="/login">Login</NavLink>)}
      </div>
      <ul>
        <li>
          <NavLink to="/"> Home </NavLink>
        </li>
        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
        <li>
          <NavLink to="/about"> About </NavLink>
        </li>
      </ul>
      {/* <h1> hello {name}</h1> */}
    </>
  );
};

