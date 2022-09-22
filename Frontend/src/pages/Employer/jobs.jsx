import React from "react";
import AuthLayout from "../Layout/Auth";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { Loading } from "../../components/Loading";
import { useMemo } from "react";
import { Table } from "../../components/Table";


export const jobs = () => {
  const API = useAxiosPrivate();

  const empID = 2;
/*
  //React query to fetch Jobs
  const { isLoading, isError, data } = useQuery("jobs", fetchJobs, {
    refetchOnWindowFocus: false,
    retry: 0,
  });
  //Async function to fetch Jobs
  async function fetchJobs() {
    const res = await API.get(`/jobs?emp_id=${empID}`);
    return res.data;
  }
  if (isLoading) return <Loading />;
  if (isError) return <h1>Error</h1>;
  console.log(data);
*/

const getData = [
  {
    id: 1,
    title: "Software Engineer",
    description: 'Some description',
    location: 'Some location',
    salary: 10000,
    emp_id: 2,
    created_at: '2021-05-01T00:00:00.000Z',
    status : 'active'
  },
  {
    id: 2,
    title: "Deeer",
    description: 'Some description',
    location: 'Some location',
    salary: 10000,
    emp_id: 2,
    created_at: '2021-05-01T00:00:00.000Z',
    status : 'active'
  },
  {
    id: 3,
    title: "Dev Engineer",
    description: 'Some description',
    location: 'Some location',
    salary: 10000,
    emp_id: 2,
    created_at: '2021-05-01T00:00:00.000Z',
    status : 'nope'
  },
  {
    id: 3,
    title: "Electric Engineer",
    description: 'i dont know',
    location: 'London, UK',
    salary: 5000,
    emp_id: 2,
    created_at: '2021-05-01T00:00:00.000Z',
    status : 'nope'
  }
]

  const columns = useMemo(
    () => [
      {
        id: "title",
        header: "Job Title",
        accessorKey: "title",
        //Not filterable
        enableFilters : false,
      },
      {
        id: "description",
        header: "Job Description",
        accessorKey: "description",
      },
      {
        id: "location",
        header: "Job Location",
        accessorKey: "location",
      },
      {
        id: "type",
        header: "Job Type",
        accessorKey: "type",
      },
      {
        id: "category",
        header: "Job Category",
        accessorKey: "category",
      },
      {
        id: "salary",
        header: "Job Salary",
        accessorKey: "salary",
      },
      {
        id: "status",
        header: "Job Status",
        accessorKey: "status",
      },
    ], []
  )

  const data = useMemo(() => getData, [])

  return (
    <AuthLayout title="Manage Job Posting">
      <div className="wrapper">
        <h1>Jobs</h1>
        <Table columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
};
