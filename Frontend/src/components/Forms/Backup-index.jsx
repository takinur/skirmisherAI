//Stored as a backup for Employer  Profile


import React, { useState } from "react";
import classNames from "classnames";
import Label from "../Label";
import Input from "../Input";
import ButtonDefault from "../ButtonDefault";
import { SelectDropDown } from "../SelectDropdown";

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export const EmpProfileForm = (props) => {
  const API = useAxiosPrivate();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);

  const fetchCompanies = async () => {
    const res = await API.get("/company/");

    if (res.status === 200) {
      setCompanies(res.data);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const addMutation = useMutation((data) => API.post("/account/employer/", data));

  //React hook form
  const { register, handleSubmit } = useForm();
  
  const submitForm = (employee) => {
    //Override form data with user id
    employee.user = props.user.id;
    employee.organization = selectedCompany.id;
    addMutation.mutate(employee);
  };

  //Navigate to Profile
  useEffect(() => {
    if (addMutation.isSuccess) {
      toast.success("Profile Updated");
      //reload page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    
    }

  }, [addMutation.isSuccess]);

  if(addMutation.error) return <div className="text-red-400 font-bold">Something went Wrong!</div>
  const isLoading = addMutation.isLoading;

  const addNewCompany = () => {
    companies.push({ id: companies.length + 1, name: "New Company" });
    console.log({ companies });
  };

  return (
    <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
      <div className="w-full sm:max-w-lg mt-6 px-6 py-4 bg-gray-200 shadow-md overflow-hidden sm:rounded-lg">
        <div className="text-center mb-7">
          <h2 className="text-3xl">Finish confirming the details!</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <Label htmlFor="designation">Organization / Company</Label>
            <SelectDropDown
              selected={selectedCompany}
              setSelected={setSelectedCompany}
              items={companies}
              addNewItem={addNewCompany}
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              type="text"
              className="mt-1 block w-full"
              {...register("designation")}
              required
              autoFocus
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="text"
              className="mt-1 block w-full"
              {...register("phone")}
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <ButtonDefault
              className={classNames("ml-4", {
                "opacity-25": isLoading,
              })}
              disabled={isLoading}
            >
              Save Changes
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};
