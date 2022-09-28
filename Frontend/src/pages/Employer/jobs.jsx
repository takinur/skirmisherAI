import React from "react";
import AuthLayout from "../Layout/Auth";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import { Loading } from "../../components/Loading";
import { Table } from "../../components/Table";
import { Link } from "react-router-dom";
import { NoExInfo } from "../../components/Alerts";

import { useProfile } from "../../hooks/useProfile";
import HeadlessModal from "../../components/Modal";
import { useState } from "react";

export const jobs = () => {
  const API = useAxiosPrivate();

  //Custom hook to check if user profile exist
  const {
    isLoading: empLoading,
    isError: empErr,
    data: employer,
  } = useProfile();

  // console.log("FROM HOOK", employer);

  const isEnabled = employer !== undefined || null ? true : false;

  // React query to fetch Jobs
  const { isLoading, data } = useQuery(
    "jobs",
    async () => {
      const res = await API.get(`/jobs?emp_id=${employer?.id}`);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: isEnabled, //Disable query if employer is null / undefined
    }
  );

  // console.log("Jobs;", data);
  
  //Delete Method
  const handleDelete = (id) =>{
    console.log('deete', id)
  }

  //Conditional rendering
  const renderDetails = () => {
    if (empLoading || isLoading) return <Loading />;
    if (empErr)
      return (
        <NoExInfo
          to="/user/profile"
          text="It seems that you have not provided additional details! "
        />
      );
    if (data.length === 0)
      return (
        <NoExInfo
          to="/employer/jobs/create"
          text="You have not posted any jobs"
          callToact="Post a new Job"
          state={{ employer: employer.id }}
        />
      );
    return (
      <div className="wrapper">
        <Link
          to={`/employer/jobs/create`}
          state={{ employer: employer.id }}
          type="button"
          className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Post a new Job
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>

        <Table columns={columns} data={data} />
      </div>
    );
  };

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
      cell: (row) => <Actions row={row.getValue()} employer={employer} />,
      //Not filterable
      enableColumnFilter: false,
    },
  ];

  const [isModal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <AuthLayout title="Manage Job Posting">
      {renderDetails()}
      <ConfirmModal isModal={isModal} closeModal={closeModal} />
    </AuthLayout>
  );
};

//Actions column
function Actions({ row, employer, handleDelete }) {
  return (
    <div className="flex item-center">
      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
        <Link to={`/employer/jobs/${row}/view`}>
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </Link>
      </div>
      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
        <Link to={`/employer/jobs/${row}/edit`} state={{ employer: employer }}>
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
        </Link>
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

function ConfirmModal({ isModal, closeModal }) {
  return (
    <HeadlessModal isOpen={isModal} closeModal={closeModal}>
      <div className="text-center p-5 flex-auto justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 flex items-center text-red-500 mx-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
        <p className="text-sm text-gray-500 px-8">
          Do you really want to delete your Job posting? This process cannot be
          undone
        </p>
      </div>

      <div className="p-3  mt-2 text-center space-x-4 md:block">
        <button
          onClick={closeModal}
          className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
          Delete
        </button>
      </div>
    </HeadlessModal>
  );
}
