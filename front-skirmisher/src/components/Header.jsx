import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset, getUserDetails } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.auth)
  const { user, authToken } = useSelector((state) => state.auth);

  // console.log(authToken, user);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if(authToken){
      // console.log(authToken)
      dispatch(getUserDetails())
    }
  }, [authToken, dispatch])

  // //Automatically authenticate user on page load if token is present
  // useEffect(() => {
  //   if (userToken) {
  //     dispatch(getUserDetails())
  //   }
  // } , [dispatch, userToken])

  return (
    <header className="header">
      <div className="text-red-400 text-lg">
        Here we go again
      </div>
      <DatePicker />
      <ul>
        {authToken ? (
          <li>
            <button className="btn" onClick={onLogout}>
              Logout
            </button>
            <p>Your are logged to the system. { user ? user.username : 'NOPE' } </p>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
