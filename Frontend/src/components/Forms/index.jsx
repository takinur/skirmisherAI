import React, { useState } from "react";
import classNames from "classnames";
import Label from "../Label";
import Input from "../Input";
import ButtonDefault from "../ButtonDefault";
import { SelectListBox } from "../SelectDropdown";

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const compSizes = [
  {name : ' 10 People or Less'},
  {name : ' 11-50 People'},
  {name : ' 51-200 People'},
  {name : ' 201-500 People'},
  {name : ' 501-1000 People'},
  {name : ' More than 1000 People'},
]


export const EmpProfileForm = (props) => {
  const API = useAxiosPrivate();
  const [selectedSize, setSelectedSize] = useState(compSizes[0]);

  
  const addMutation = useMutation((data) =>
    API.post("/account/employer/", data)
  );

  //React hook form
  const { register, handleSubmit } = useForm();

  const submitForm = (employee) => {
    //Override form data with user id
    employee.user = props.user.id;
    employee.company_size = selectedSize.name;
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
    if (addMutation.error) {
      let err = addMutation.error.response.data;

      if(err.company_name) toast.error("Company name is required.");
      if(err.website) toast.error(err.website[0]);

      console.log('Error updating Profile', err);
      
    }
  }, [addMutation.isSuccess, addMutation.error]);

  const isLoading = addMutation.isLoading;

  return (
    <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
      <div className="w-full sm:max-w-2xl mt-6 px-6 py-4 bg-gray-200 shadow-md overflow-hidden sm:rounded-lg">
        <div className="text-center mb-7">
          <h2 className="text-3xl">Finish confirming some details!</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="wrapper md:flex">
            <div className="mt-4 mr-2 flex-auto">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                type="text"
                className="mt-1 block w-full"
                {...register("company_name")}
                required
                autoFocus
              />
            </div>
            <div className="mt-4 flex-auto">
              <Label htmlFor="website">Website </Label>
              <Input
                id="website"
                type="text"
                placeholder="https://"
                className="mt-1 block w-full"
                {...register("website")}
                required
              />
            </div>
          </div>
          <div className="mt-4 flex-auto">
            <Label htmlFor="location">Location </Label>
            <Input
              id="location"
              type="text"
              className="mt-1 block w-full"
              {...register("location")}
              required
            />
          </div>
          <div className="wrapper md:grid grid-cols-2">
            <div className="mt-4 mr-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                className="mt-1 block w-full"
                {...register("phone")}
                required
              />
            </div>
            <div className="mt-4 ">
              <Label htmlFor="phone">Size</Label>
              <SelectListBox items={compSizes} selected={selectedSize} setSelected={setSelectedSize}  />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="slogan">
              Tagline<span className="ml-1">(Optional)</span>
            </Label>
            <Input
              id="slogan"
              type="text"
              placeholder="e.g. We are the best"
              className="mt-1 block w-full"
              {...register("slogan")}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="about">
              Other Detials<span className="ml-1">(Optional)</span>
            </Label>
            <Input
              id="about"
              type="text"
              className="mt-1 block w-full"
              {...register("about")}
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
