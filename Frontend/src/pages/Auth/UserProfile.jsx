import React, { useState } from "react";
import { useSelector } from "react-redux";
import AuthLayout from "../Layout/Auth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { EmpProfileForm } from "../../components/Forms";

import { Profile as EmpProfile } from "../Employer/profile";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  // const roleBasedRender = () => {
  //   // if (user.role === "EMPLOYER") return <EmpProfileForm user={user} />;
  //   if (user.role === "EMPLOYER") return <EmpProfile user={user} />;
  // };

  const RoleView = {
    EMPLOYER: <EmpProfile user={user} />,
    CANDIDATE: <div> Eww Candidate Profile </div>,
  }[user.role] ?? <h1>Something went Wrong! Try refreshing the page.</h1>;

  //Main return statement
  return <AuthLayout title="Manage your profile">{RoleView}</AuthLayout>;
}
