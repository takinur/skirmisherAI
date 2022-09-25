import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import classNames from "classnames";

import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { SelectListBox } from "../../components/SelectDropdown";

import AuthLayout from "../Layout/Auth";
import Label from "../../components/Label";
import Input from "../../components/Input";
import ButtonDefault from "../../components/ButtonDefault";

const expLevel = [
  { name: "Freshers are encourged" },
  { name: "Nice to have any" },
  { name: "Nice to have 1 Years" },
  { name: "More than 1 Year is required" },
  { name: "More than 2 Years is required" },
  { name: "More than 3 Years is required" },
  { name: "More than 4 Years is required" },
  { name: "More than 5 Years is required" },
  { name: "More than 6 Years is required" },
];
// TODO: Sklls should be fetched from the backend
const skills = [
  { name: "HTML", id: 1 },
  { name: "CSS", id: 2 },
  { name: "JavaScript", id: 3 },
  { name: "React", id: 4 },
  { name: "Node", id: 5 },
  { name: "Python", id: 6 },
  { name: "Django", id: 7 },
  { name: "Flask", id: 8 },
  { name: "Java", id: 9 },
  { name: "C++", id: 10 },
  { name: "C#", id: 11 },
  { name: "C", id: 12 },
  { name: "PHP", id: 13 },
  { name: "Ruby", id: 14 },
  { name: "Go", id: 15 },
  { name: "Swift", id: 16 },
  { name: "Kotlin", id: 17 },
  { name: "Rust", id: 18 },
  { name: "SQL", id: 19 },
  { name: "NoSQL", id: 20 },
  { name: "MongoDB", id: 21 },
  { name: "PostgreSQL", id: 22 },
  { name: "MySQL", id: 23 },
  { name: "Firebase", id: 24 },
  { name: "AWS", id: 25 },
  { name: "Azure", id: 26 },
  { name: "GCP", id: 27 },
  { name: "Docker", id: 28 },
  { name: "Kubernetes", id: 29 },
  { name: "Git", id: 30 },
  { name: "GitHub", id: 31 },
  { name: "GitLab", id: 32 },
  { name: "BitBucket", id: 33 },
  { name: "Linux", id: 34 },
  { name: "Windows", id: 35 },
  { name: "Laravel", id: 36 },
];

export const CreateNewJob = () => {
  const navigate = useNavigate();
  const API = useAxiosPrivate();

  const [selectedExp, setselectedExp] = useState(expLevel[0]);
  const [selectedSkill, setselectedSkill] = useState([skills[0], skills[1]]);

  console.log("selected EXP", selectedExp);
  console.log("selected SKILL", selectedSkill);

  //React hook form
  const { register, handleSubmit } = useForm();

  const addMutation = useMutation((data) =>
    API.post("/jobs/", data)
  );
  const submitForm = (data) => {
    //Override form data with user id
    data.employer = 2; //TODO: Get user id from the State
    data.level = setselectedExp.name;

    //Unique skills array
    let uniqueSkills = [...new Set(selectedSkill.map((item) => item.name))];
    //Combine skills array
    data.qualifications = uniqueSkills.join(", ");
    console.log("TO BE SUBMIT", data);
    addMutation.mutate(data);
  };

  //Navigate to Profile
  useEffect(() => {
    if (addMutation.isSuccess) {
      toast.success("New job posted Succesfully!");
      // //reload page after 2 seconds
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    }
    if (addMutation.error) {
      let err = addMutation.error.response.data;

      if (err.company_name) toast.error("Company name is required.");
      if (err.website) toast.error(err.website[0]);

      console.log("Error creating Job", err);
    }
  }, [addMutation.isSuccess, addMutation.error]);

  const isLoading = addMutation.isLoading;

  return (
    <AuthLayout title="Add New Job">
      <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
        <div className="w-full sm:max-w-2xl mt-6 px-6 py-4 bg-gray-200 shadow-md overflow-hidden sm:rounded-lg">
          <div className="text-center mb-7">
            <h2 className="text-3xl">Post new job for talent hiring</h2>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="mt-1 flex-auto">
              <Label htmlFor="title">Enter the name of your Job post </Label>
              <Input
                id="title"
                type="text"
                className="mt-1 block w-full"
                {...register("title")}
                required
              />
              <span className="text-sm text-gray-500">
                <b>Example:</b> Full-Stack MERN Stack Developer
              </span>
            </div>
            <div className="mt-4 flex-auto">
              <Label htmlFor="type">What type of Job you offer </Label>
              <Input
                id="type"
                type="text"
                className="mt-1 block w-full"
                {...register("type")}
                required
              />
              <span className="text-sm text-gray-500">
                <b>Example:</b> Full-Time / Remote / Part-Time
              </span>
            </div>
            <div className="wrapper md:flex">
              <div className="mt-4 mr-2 flex-auto">
                <div className="wrapper">
                  <Label htmlFor="salary">Salary (Optional)</Label>
                  <Input
                    id="salary"
                    type="text"
                    className="mt-1 block w-full"
                    {...register("salary")}
                  />
                  <span className="text-sm text-gray-500">
                    <b>Example:</b> $60000 - $80000 / Year
                  </span>
                </div>
              </div>
              <div className="mt-4 flex-auto">
                <Label htmlFor="work_location">Location </Label>
                <Input
                  id="work_location"
                  type="text"
                  className="mt-1 block w-full"
                  {...register("work_location")}
                  required
                />
                <span className="text-sm text-gray-500">
                  Add regions or Cities
                </span>
              </div>
            </div>
            <div className="wrapper md:grid grid-cols-2">
              <div className="mt-4 mr-2">
                <Label htmlFor="phone">Benefits</Label>
                <Input
                  id="benefits"
                  type="text"
                  className="mt-1 block w-full"
                  {...register("benefits")}
                />
                <span className="text-sm text-gray-500">
                  <b>Example:</b> 401K, Health Insurance
                </span>
              </div>
              <div className="mt-4 ">
                <Label htmlFor="phone">Experience</Label>
                <SelectListBox
                  items={expLevel}
                  selected={selectedExp}
                  setSelected={setselectedExp}
                />
              </div>
            </div>
            <div className="mt-4 ">
              <Label htmlFor="phone">Qualifications for Job</Label>
              <SelectListBox
                items={skills}
                selected={selectedSkill}
                setSelected={setselectedSkill}
                isMultiple={true}
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="description">Other details about the job</Label>
              <textarea
                id="description"
                rows="4"
                {...register("description")}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Full Job Description"
              ></textarea>
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
    </AuthLayout>
  );
};
