import React from "react";
import AuthLayout from "../Layout/Auth";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { Loading } from "../../components/Loading";
import { Table } from "../../components/Table";

export const jobs = () => {
  const API = useAxiosPrivate();

  const empID = 2; //Hardcoded for now

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
      cell: (row) => <Actions row={row.getValue()} />,
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

//Actions column
function Actions({ row }) {
  return (
    <div className="flex item-center">
      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokLinecap="round"
            strokLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokLinecap="round"
            strokLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
}
