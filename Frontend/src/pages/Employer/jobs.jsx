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



  const columns =  [
      {
  
        title: "Job Title",
        dataIndex: "title",
        sorter: (a, b) => a.title - b.title,
      },
      {
        title: "Job Location",
        dataIndex: "location",
      },
      {
        title: "Job Salary",
        dataIndex: "salary",
        sorter: (a, b) => a.salary - b.salary,
      },
      {
        title: "Job Status",
        dataIndex: "status",
        //Active or Inactive
        filters: [
          {
            text: "Active",
            value: "Active",
          },
          {
            text: "Inactive",
            value: "Inactive",
          },
       
        ]
      },
      {
        title: "Date",
        dataIndex: "created_at",
        sorter: (a, b) => a.created_at - b.created_at,
      },
      {
        title: 'Action',
        key: 'action',
        sorter: false,
        render: (record) => (
          <span>
            <a>Delete {record.id}</a>
            <a>
              <span>
                More actions
               
              </span>
            </a>
          </span>
        ),
      },
    ]

  // const data = useMemo(() => getData, [])

  return (
    <AuthLayout title="Manage Job Posting">
      <div className="wrapper">
        <h1>Jobs</h1>
        <Table columns={columns} data={data} />
      </div>
    </AuthLayout>
  );
};
