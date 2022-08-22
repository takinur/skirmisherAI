import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const { user } = useSelector((state) => state.auth)
  const { user, authToken } = useAppSelector((state : any) => state.auth);

  console.log(authToken, user);

  const onLogout = () => {
    dispatch(logout(user));
    dispatch(reset());
    navigate("/");
  };

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
    <header className="header">
      <div className="logo">
        Here we go again
      </div>
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
