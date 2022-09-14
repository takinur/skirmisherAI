import React, { useState } from "react";
import { useSelector } from "react-redux";
import AuthLayout from "../Layout/Auth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { EmpProfileForm } from "../../components/Forms";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);

  const API = useAxiosPrivate();

  const [selectedCompany, setSelectedCompany] = useState([]);

  //React query to fetch profile
  const { isLoading, isError, error, data } = useQuery(
    "empProfile",
    fetchProfile,
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );
  //Async function to fetch profile
  async function fetchProfile() {
    const res = await API.get(`/account/employer/${user.id}`);
    return res.data;
  }
  //React hook form
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    //Override the company id with the selected company
    data.organization = selectedCompany.id;
    console.log(data);
  };

  const roleBasedRender = () => {
    if (user.role === "EMPLOYER")
      return (
        <EmpProfileForm
          handleSubmit={handleSubmit}
          submitForm={submitForm}
          register={register}
          isLoading={isLoading}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />
      );
  };

  return (
    <AuthLayout title={"Manage your profile"}>
      <div>UserProfile</div>
      {roleBasedRender()}
    </AuthLayout>
  );
}
