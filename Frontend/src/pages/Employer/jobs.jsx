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

  //Columns for the table
  const columns = [
    {
      // id: "title",
      header: "Job Title",
      accessorKey: "title",
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "type",
    },
    {
      id: "salary",
      header: "Salary Info",
      accessorKey: "salary",
      //Not filterable
      enableColumnFilter: false,
    },
    {
      id: "location",
      header: "Location",
      accessorKey: "work_location",
      //Not filterable
      enableColumnFilter: false,
    },
    {
      id: "date",
      header: "Posted On",
      accessorKey: "created_at",
      //Convert django date to readable format
      cell: (row) => {
        const date = new Date(row.getValue());
        // Days ago format
        const days = Math.floor((new Date() - date) / 86400000);
        return days + " days ago";
      },
      //Not filterable
      enableColumnFilter: false,
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "id",
      cell: (row) => <span className="text-blue-500">{row.getValue()}</span>,
      //Not filterable
      enableColumnFilter: false,
    },
  ];

  return (
    <AuthLayout title="Manage Job Posting">
      <div className="wrapper">
        <h1>Jobs</h1>
        <Table columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
};
