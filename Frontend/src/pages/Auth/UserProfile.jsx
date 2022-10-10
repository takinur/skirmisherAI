import React from "react";
import { useSelector } from "react-redux";
import AuthLayout from "../Layout/Auth";

import { Profile as EmpProfile } from "../Employer/profile";
import { Profile as CandProfile } from "../Candidate/profile";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  const RoleView = {
    EMPLOYER: <EmpProfile />,
    CANDIDATE: <CandProfile />,
  }[user.role] ?? <h1>Something went Wrong! Try refreshing the page.</h1>;

  //Main return statement
  return <AuthLayout title="Manage your profile">{RoleView}</AuthLayout>;
}
