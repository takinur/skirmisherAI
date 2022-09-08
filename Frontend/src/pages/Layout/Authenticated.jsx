import React from "react";

const Layout = ({ children, user }) => {

  console.log(user.name)
  return (
    <>
    {/* <h1> Look a auth guy here! {user.name}</h1> */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
