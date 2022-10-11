import React from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

const GuestLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="bg-gray-50 dark:bg-gray-800 dark:text-zinc-50">{children}</main>
      <Footer />
    </>
  );
};

export default GuestLayout;
