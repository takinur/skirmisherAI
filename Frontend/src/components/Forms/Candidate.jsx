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

const designations = [
  { name: "Student" },
  { name: "Web Developer" },
  { name: "Software Developer" },
  { name: "Mobile Developer" },
  { name: "UI/UX Designer" },
  { name: "Graphics Designer" },
  { name: "Data Scientist" },
  { name: "Data Analyst" },
  { name: "Data Engineer" },
  { name: "Data Architect" },
  { name: "Data Visualization" },
];

export const CandProfileForm = (props) => {
  const API = useAxiosPrivate();
  const [selectedDesig, setSelectedDesig] = useState(designations[0]);

  const addMutation = useMutation((data) =>
  console.log('data', data)
    // API.post("/account/candidate/", data)
  );

  //React hook form
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    console.log('before form data', data)
    const formData = new FormData();
    formData.append("resume", data.resume[0]);
    formData.append("phone", data.phone);
    formData.append("designation", selectedDesig.name);
    formData.append("location", data.location);
    // data.resume = data.reusme[0]

    console.log('form data', formData)

    addMutation.mutate(formData);
  };

  //Navigate to Profile
  useEffect(() => {
    // if (addMutation.isSuccess) {
    //   toast.success("Great, Profile Updated.");
    //   //reload page after 2 seconds
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // }
    if (addMutation.error) {
      let err = addMutation.error.response.data;

      if (err.company_name) toast.error("Company name is required.");
      if (err.website) toast.error(err.website[0]);

      console.log("Error updating Profile", err);
    }
  }, [addMutation.isSuccess, addMutation.error]);

  const isLoading = addMutation.isLoading;

  return (
    <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
      <div className="w-full sm:max-w-2xl mt-6 px-6 py-4 bg-gray-200 shadow-md overflow-hidden sm:rounded-lg">
        <div className="text-center mb-7">
          <h2 className="text-3xl">Confirm some additional Details.</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="wrapper md:grid grid-cols-2">
            <div className="mt-4 mr-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <Input
                id="phone"
                type="text"
                className="mt-1 block w-full"
                {...register("phone")}
                required
              />
            </div>
            <div className="mt-4 ">
              <Label htmlFor="phone">Current Designation</Label>
              <SelectListBox
                items={designations}
                selected={selectedDesig}
                setSelected={setSelectedDesig}
              />
            </div>
          </div>
          <div className="mt-4 flex-auto">
            <Label htmlFor="location">Location </Label>
            <Input
              id="location"
              type="text"
              className="mt-1 block w-full"
              placeholder="e.g. Greenwich, London"
              {...register("location", { required: true })}
              required
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  {...register("resume")}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
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
