import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {

  let name = useContext(AuthContext);
  console.log(name);

  return (
    <>
      <ul>
        <li>
          <NavLink to="/"> Home </NavLink>
        </li>
        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
        <li>
          <NavLink to="/about"> About </NavLink>
        </li>
      </ul>
      {/* <h1> hello {name}</h1> */}
    </>
  );
};

