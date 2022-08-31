import React from "react";
import { useSelector } from "react-redux";
import { CandidateDashboard } from "./Candidate/Dashboard";
import { EmployerDashboard } from "./Employer/Dashboard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-screen bg-green-600">
      {user.role !== "Candidate" ? (
        <EmployerDashboard />
      ) : user.role !== "Employeer" ? (
        <CandidateDashboard />
      ) : (
        <h1>Something went Wrong! Try refreshing the page.</h1>
      )}
    </div>
  );
};

export default Dashboard;
