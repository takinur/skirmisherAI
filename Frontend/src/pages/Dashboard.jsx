import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, getUserDetails  } from "../features/auth/authSlice";

import { CandidateDashboard } from "./Candidate/Dashboard";
import { EmployerDashboard } from "./Employer/Dashboard";

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

  // const RoleSpecificView = RoleView[role] ?? <h1>Something went Wrong! Try refreshing the page.</h1>

  return <div className="h-screen bg-green-600">{RoleView}</div>;
};

export default Dashboard;
