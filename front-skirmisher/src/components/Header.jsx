import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset, getUserDetails } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { useAxios } from "../_helpers/useAxios";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = useAxios();
  const { user, authToken } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({});
  
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };


  // const getUserInfo = async () => {
  //   const response = await API.get("auth/user/");
  //   if (response.status === 200) {
  //     setUserDetails(response.data);
  //   }
  // };
  // // console.log(userDetails);
  // useEffect(() => {
  //   getUserInfo();
  // } , []);

//  console.log(authToken);
  useEffect(() => {
    if(authToken){
      dispatch(getUserDetails())
      // getUserInfo();

    }
  }, [authToken, dispatch])

  return (
    <header className="header">


      <DatePicker />
      <ul>
        {authToken ? (
          <li>
            <button className="btn" onClick={onLogout}>
              Logout
            </button>

            <p>
            {user ? `Logged in as ${user.email}` : "You're not logged in"}
            </p>
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
