import React from "react";
import GuestNavBar from "./GuestNavBar";

const GuestLayout = ({ children }) => {
  return (
    <>
      <GuestNavBar />
      <main>{children}</main>
    </>
  );
};

export default GuestLayout;
