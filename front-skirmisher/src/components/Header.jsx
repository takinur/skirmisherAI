import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset, getUserDetails } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import useAxios  from "../_helpers/useAxios";
import "antd/dist/antd.css";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  // const API = useAxios();

  const { user, authToken } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  // const getUserInfo = async () => {
  //   const response = await API.get("auth/user/");
  //   if (response.status === 200) {
  //     setUserInfo(response.data);
  //   }
  // };
  // useEffect(() => {
  //   getUserInfo();
  // } , []);


  useEffect(() => {
    if(authToken){
      dispatch(getUserDetails())
      // getUserInfo();
    }
  }, [authToken, dispatch])

  return (
    <header className="header">
      <div className="text-red-400 text-lg">Here we go again</div>
      <DatePicker />
      <div>
         {console.log(userInfo)
         
         }
      </div>
      <ul>
        {authToken ? (
          <li>
            <button className="btn" onClick={onLogout}>
              Logout
            </button>
            <p>
              Your are logged to the system. {user ? user.name : "NOPE"}{" "}
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
