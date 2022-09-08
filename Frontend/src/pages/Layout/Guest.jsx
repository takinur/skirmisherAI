import React from "react";
import NavBar from "../../components/NavBar";

const GuestLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

export default GuestLayout;
