import React, { useState } from 'react'
import AuthLayout from '../Layout/Auth'
import { useQuery } from 'react-query'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'
import { relativeTime } from '../../hooks/useRelativetime'

import { Loading } from '../../components/Loading'
import { Table } from '../../components/Table'
import { Link } from 'react-router-dom'
import { NoExInfo } from '../../components/Alerts'

import { useProfile } from '../../hooks/useProfile'
import HeadlessModal from '../../components/Modal'
import { useTitle } from '../../hooks/useTitle'

export const jobs = () => {
  useTitle('Manage Jobs - Dashboard ')
  const API = useAxiosPrivate()
  const [isModal, setModal] = useState(false)
  const [jobID, setJobID] = useState(null)

  const closeModal = () => {
    setModal(false)
    setJobID(null)
  }

  //Custom hook to check if user profile exist
  const { isLoading: empLoading, isError: empErr, data: employer } = useProfile()
  //State to check if profile exist
  const isEnabled = employer !== undefined || null ? true : false

  //Columns for the table
  const columns = [
    {
      // id: "title",
      header: 'Job Title',
      accessorKey: 'title',
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
    },
    {
      id: 'salary',
      header: 'Salary Info',
      accessorKey: 'salary',
      //Not filterable
      enableColumnFilter: false,
    },
    {
      id: 'location',
      header: 'Location',
      accessorKey: 'work_location',
      //Not filterable
      enableColumnFilter: false,
    },
    {
      id: 'date',
      header: 'Posted',
      accessorKey: 'created_at',
      //Convert django date to readable format
      cell: (row) => {
        return relativeTime(row.getValue())
      },
      //Not filterable
      enableColumnFilter: false,
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'id',
      cell: (row) => (
        <Actions row={row.getValue()} employer={employer} setModal={setModal} setJobID={setJobID} />
      ),
      //Not filterable
      enableColumnFilter: false,
    },
  ]

  // React query to fetch Jobs
  const { isLoading, data, refetch } = useQuery(
    'jobs',
    async () => {
      const res = await API.get(`/jobs?emp_id=${employer?.id}`)
      return res.data
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: isEnabled, //Disable query if employer is null / undefined
    }
  )

  const deleteRow = async () => {
    try {
      const response = await API.delete(`/jobs/${jobID}`)
      // console.log(response);
      if (response.status === 204) {
        closeModal()
        //refetch the data
        refetch()
        toast.info('Job deleted successfully')
      }
    } catch (error) {
      console.log('Delete Error', error)
    }
  }

  //Conditional rendering
  const renderDetails = () => {
    if (empLoading || isLoading) return <Loading />
    if (empErr)
      return (
        <NoExInfo
          to="/user/profile"
          text="It seems that you have not provided additional details! "
        />
      )
    if (data.length === 0)
      return (
        <NoExInfo
          to="/employer/jobs/create"
          text="You have not posted any jobs."
          callto="Post a new Job"
          state={{ employer: employer.id }}
        />
      )
    return (
      <div className="wrapper">
        <Link
          to={`/employer/jobs/create`}
          state={{ employer: employer.id }}
          type="button"
          className="mt-4 inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Post a new Job
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 h-5 w-5"
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
    )
  }

  return (
    <AuthLayout title="Manage Job Posting">
      {renderDetails()}
      <HeadlessModal isOpen={isModal} closeModal={closeModal}>
        <div className="flex-auto justify-center p-5 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-m-1 mx-auto flex h-4 w-4 items-center text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto flex h-16 w-16 items-center text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="py-4 text-xl font-bold ">Are you sure?</h2>
          <p className="px-8 text-sm text-gray-500">
            Do you really want to delete your Job posting? This process cannot be undone
          </p>
        </div>

        <div className="mt-2  space-x-4 p-3 text-center md:block">
          <button
            onClick={closeModal}
            className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0"
          >
            Cancel
          </button>
          <button
            onClick={deleteRow}
            className="mb-2 rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg md:mb-0"
          >
            Delete
          </button>
        </div>
      </HeadlessModal>
    </AuthLayout>
  )
}

//Actions column
function Actions({ row, employer, setModal, setJobID }) {
  const handleDelete = () => {
    setModal(true)
    setJobID(row)
  }
  return (
    <div className="item-center flex">
      <div className="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
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
      <div className="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
        <Link to={`/employer/jobs/${row}/edit`} state={{ employer: employer.id }}>
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
      <div className="mr-2 w-4 transform hover:scale-110 hover:text-purple-500">
        <svg
          onClick={handleDelete}
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
  )
}
