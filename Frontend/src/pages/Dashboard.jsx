import React from "react";
import { useSelector } from "react-redux";

import { CandidateDashboard } from "./Layout/Candidate";
import { EmployerDashboard } from "./Layout/Employer";

import AuthLayout from "./Layout/Auth";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const RoleView = {
    EMPLOYER: <EmployerDashboard />,
    CANDIDATE: <CandidateDashboard />,
  }[user.role] ?? <h1>Something went Wrong! Try refreshing the page.</h1>;

  return <AuthLayout>{RoleView}</AuthLayout>;
};

export default Dashboard;
