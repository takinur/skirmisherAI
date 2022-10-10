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

// Import FilePond
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

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

  const addMutation = useMutation(
    async (data) =>
      await API.post("/account/candidate/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
  );

  //React hook form
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState([]); // FilePond state

  const submitForm = (data) => {
    data.user = props.user.id;
    data.designation = selectedDesig.name;
    // data.resume_file = files[0]?.file; //OLD way
    // Check if file is uploaded or not
    if (files[0]?.serverId) {
      data.resume_file = files[0]["serverId"];
    }

    //Validation for filepond
    if (files.length === 0) {
      toast.error("Please upload your resume.");
      return;
    }
    // //Only allow pdf files
    // if (files[0].fileType !== "application/pdf") {
    //   toast.error("Only pdf files are allowed.");
    //   return;
    // }

    addMutation.mutate(data);
  };

  console.log("server response", addMutation);

  //Navigate to Profile
  useEffect(() => {
    if (addMutation.isSuccess) {
      toast.success("Great, Profile Updated.");
      //reload page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    if (addMutation.error) {
      let err = addMutation.error.response.data;

      if(err.location) toast.error("Location is required.");
      if(err.message) toast.warning('Something Went Wrong!')

      console.log("Error updating Profile", err);
    }
  }, [addMutation.isSuccess, addMutation.error]);

  const isLoading = addMutation.isLoading || addMutation.isSuccess;

  return (
    <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
      <div className="w-full  sm:max-w-2xl mt-6 px-6 py-4 bg-gray-200 shadow-md overflow-hidden sm:rounded-lg">
        <div className="text-center mb-7">
          <h2 className="text-3xl">Confirm some additional Details.</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="wrapper md:grid grid-cols-2"> 
            <div className="mt-4 mr-2">
              <Label htmlFor="phone">Current Designation</Label>
              <SelectListBox
                items={designations}
                selected={selectedDesig}
                setSelected={setSelectedDesig}
              />
            </div>
            <div className="mt-4 mr-2">
              <Label htmlFor="website">Website / Portfolio (Optional) </Label>
              <Input
                id="website"
                type="text"
                className="mt-1 block w-full"
                {...register("website")}
              />
            </div>
          </div>         
          <div className="mt-4 mr-2">
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
            <p
              className="mb-2 text-sm text-gray-700 font-semibold"
              htmlFor="file"
            >
              Upload Your Resume (PDF Format Only){" "}
            </p>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={false}
              dropValidation={true}
              credits={false}
              maxFiles={1}
              server={{
                process: import.meta.env.VITE_BASE_URL + "upload/resume/",
              }}
              name="file"
              labelIdle='Drag & Drop your resume or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <div className="mt-8 flex justify-end">
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
