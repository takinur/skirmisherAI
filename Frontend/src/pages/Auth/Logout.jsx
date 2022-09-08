import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    dispatch(reset());
  }, [dispatch]);

  return  <Navigate to="/" />;
};

export default Logout;

