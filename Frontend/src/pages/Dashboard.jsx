import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, getUserDetails } from "../features/auth/authSlice";

import { CandidateDashboard } from "./Layout/Candidate";
import { EmployerDashboard } from "./Layout/Employer";

import AuthLayout from './Layout/Auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, authToken } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  //Automatically authenticate user
  // useEffect(() => {
  //   if (authToken) {
  //     dispatch(getUserDetails());
  //   }
  // }, [authToken, dispatch]);

  const RoleView = {
    EMPLOYER: <EmployerDashboard />,
    CANDIDATE: <CandidateDashboard />,
  }[user.role] ?? <h1>Something went Wrong! Try refreshing the page.</h1>;
  
  return <AuthLayout user={user}>{RoleView}</AuthLayout>;
};

export default Dashboard;
