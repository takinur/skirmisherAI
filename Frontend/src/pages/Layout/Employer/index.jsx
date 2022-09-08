import React from "react";
import ContentContainer from "../../../components/ContentContainer";
import SideBar from "../../../components/Sidebar";

export const EmployerDashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <ContentContainer />
    </div>
  );
};
