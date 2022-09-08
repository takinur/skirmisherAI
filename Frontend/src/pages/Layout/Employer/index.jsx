import React from "react";
import ContentContainer from "../../../components/ContentContainer";
import SideBar from "../../../components/Sidebar";
import SubMenu from "../../../components/SubMenu";

export const EmployerDashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      {/* <SubMenu /> */}
      <ContentContainer />
    </div>
  );
};
