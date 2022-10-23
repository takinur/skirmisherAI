import React from 'react'
import { useTitle } from '../../hooks/useTitle'

import AuthLayout from '../Layout/Auth'

import { CSVLink } from 'react-csv'
import { format } from 'date-fns'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useProfile } from '../../hooks/useProfile'
import { useQuery } from 'react-query'

import { LineChart } from '../../components/Charts'
import ChartCard from '../../components/Charts/ChartCard'

export const Reports = () => {
  useTitle('Reports')
  //Current date and time
  const currentDT = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

  const API = useAxiosPrivate()

  //Custom hook to check if user profile exist
  const { isLoading: empLoading, isError: empErr, data: employer, user } = useProfile() //Pass retry Agument :INT

  //State to check if profile exist
  const isEnabled = employer !== undefined || null ? true : false

  //Columns for the table
  // const columns = [
  //   {
  //     // id: "title",
  //     header: 'Job Title',
  //     accessorKey: 'title',
  //   },
  //   {
  //     id: 'type',
  //     header: 'Type',
  //     accessorKey: 'type',
  //   },
  //   {
  //     id: 'salary',
  //     header: 'Salary Info',
  //     accessorKey: 'salary',
  //     //Not filterable
  //     enableColumnFilter: false,
  //   },
  //   {
  //     id: 'location',
  //     header: 'Location',
  //     accessorKey: 'work_location',
  //     //Not filterable
  //     enableColumnFilter: false,
  //   },
  //   {
  //     id: 'date',
  //     header: 'Posted',
  //     accessorKey: 'created_at',
  //     //Convert django date to readable format
  //     cell: (row) => {
  //       return relativeTime(row.getValue())
  //     },
  //     //Not filterable
  //     enableColumnFilter: false,
  //   },
  //   {
  //     id: 'actions',
  //     header: 'Actions',
  //     accessorKey: 'id',
  //     cell: (row) => (
  //       <Actions row={row.getValue()} employer={employer} setModal={setModal} setJobID={setJobID} />
  //     ),
  //     //Not filterable
  //     enableColumnFilter: false,
  //   },
  // ]

  // React query to fetch Jobs
  const {
    isLoading,
    data: jobs,
    refetch,
  } = useQuery(
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

  console.log(jobs)

  // Job posted in the last 30 days (30 days = 2592000 seconds)
  const last30Days = jobs?.filter((job) => {
    const jobDate = new Date(job.created_at).getTime() / 1000
    const currentDate = new Date().getTime() / 1000
    const diff = currentDate - jobDate
    return diff < 2592000
  })

  console.log('30Days', last30Days)

  // Count of jobs posted each day in the last 30 days
  const last30DaysCount = last30Days?.reduce((acc, job) => {
    const jobDate = new Date(job.created_at).toLocaleDateString()
    if (acc[jobDate]) {
      acc[jobDate] += 1
    } else {
      acc[jobDate] = 1
    }
    return acc
  }, {})
  console.log('30DaysCount', last30DaysCount)

  // Format data for chart
  const last30DaysCountData = Object.entries(last30DaysCount).map((item) => {
    return {
      date: item[0],
      count: item[1],
    }
  })

  // const chartLabels = last30DaysCountData?.map((item) => item.date)
  // Chart labels - All dates in the last 30 days
  const chartLabels = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toLocaleDateString()
  })

  const chartDataset = last30DaysCountData?.map((item) => item.count)

  console.log('30DaysCountData', last30DaysCountData)

  const lineData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Job',
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        fill: false,
        data: chartDataset,
      },
    ],
    legends: [{ title: 'Job Posted', color: 'bg-teal-600' }],
  }

  const headers = [
    { label: 'First Name', key: 'firstname' },
    { label: 'Last Name', key: 'lastname' },
    { label: 'Email', key: 'email' },
  ]

  const data = [
    { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
    { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
    { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
  ]

  return (
    <AuthLayout title="Reports">
      <div>Reports</div>
      <CSVLink data={data} headers={headers} filename={`Jobs_${currentDT}_SkirmisherAI.csv`}>
        Download me
      </CSVLink>

      <div className="my-8 grid gap-6 md:grid-cols-2">
        <ChartCard title="Jobs posted in 30 Days">
          <LineChart chartData={lineData} />
        </ChartCard>
      </div>
    </AuthLayout>
  )
}
