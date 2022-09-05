import React from "react";
import { useSelector } from "react-redux";
import { CandidateDashboard } from "./Candidate/Dashboard";
import { EmployerDashboard } from "./Employer/Dashboard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const RoleView = {
    EMPLOYER: <EmployerDashboard />,
    CANDIDATE: <CandidateDashboard />,
  }[user.role] ?? <h1>Something went Wrong! Try refreshing the page.</h1>;

  // const RoleSpecificView = RoleView[role] ?? <h1>Something went Wrong! Try refreshing the page.</h1>

  return <div className="h-screen bg-green-600">{RoleView}</div>;
};

export default Dashboard;
