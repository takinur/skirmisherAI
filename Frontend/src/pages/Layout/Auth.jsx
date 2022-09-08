import React, { useState, useEffect } from "react";
import SideBar from "../../components/Sidebar";
import TopNavigation from "../../components/TopNav";

const Layout = ({ children, user }) => {
  const [navbar, setNavbar] = useState(false);

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  console.log('username from auth layout',user.name);
  return (
    <div className="flex">
      <SideBar navbar={navbar} />
      <div
        className="content-container md:pl-64 flex flex-col 
    bg-gray-300 dark:bg-gray-700
    m-0 
    h-full w-full 
    overflow-hidden"
      >
        <TopNavigation toggleNavbar={toggleNavbar} />
        <main className="content-list min-h-screen p-2" onClick={toggleNavbar}>
          <h1 className="text-ceter text-2xl font-bold">Content List</h1>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
