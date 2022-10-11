import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import SideBar from "../../components/Sidebar";
import TopNavigation from "../../components/TopNav";

const Layout = ({ children, ...props }) => {
  const [navbar, setNavbar] = useState(false);

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  return (
    <div className="flex">
      <SideBar navbar={navbar} toggleNavbar={toggleNavbar} />
      <div
        className="content-container md:pl-64 flex flex-col 
    bg-gray-300 dark:bg-gray-700
    m-0 
    h-full w-full 
    overflow-hidden"
      >
        <TopNavigation toggleNavbar={toggleNavbar} title={props.title} />
        <main className="content-list min-h-screen p-2">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
