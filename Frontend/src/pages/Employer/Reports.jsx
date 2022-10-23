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

  const conditionalRender = () => {
    if (empLoading || isLoading) return <div>Loading...</div>
    if (empErr) return <div>Something went wrong!</div>

    if (jobs) return <JobsPosted data={jobs} />
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

      {conditionalRender()}
    </AuthLayout>
  )
}

const JobsPosted = ({ data }) => {
  // Job posted in the last 30 days (30 days = 2592000 seconds)
  const last30Days = data?.filter((job) => {
    const jobDate = new Date(job.created_at).getTime() / 1000
    const currentDate = new Date().getTime() / 1000
    const diff = currentDate - jobDate
    return diff < 2592000
  })

  // reverse the array to get the latest job posted
  const last30DaysReversed = last30Days?.reverse()

  // Count of jobs posted each day in the last 30 days
  const last30DaysCount = last30DaysReversed?.reduce((acc, job) => {
    const jobDate = new Date(job.created_at).toLocaleDateString()
    if (acc[jobDate]) {
      acc[jobDate] += 1
    } else {
      acc[jobDate] = 1
    }
    return acc
  }, {})
  // console.log('30DaysCount', last30DaysCount)

  // Every date in the last 30 days (30 days = 2592000 seconds)
  const last30DaysAll = []
  for (let i = 0; i < 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    last30DaysAll.push(date.toLocaleDateString())
  }

  // Count of jobs posted each day in the last 30 days
  const last30DaysAllCount = last30DaysAll?.reduce((acc, date) => {
    if (last30DaysCount[date]) {
      acc[date] = last30DaysCount[date]
    } else {
      acc[date] = 0
    }
    return acc
  }, {})
  console.log('30DaysAllCount', last30DaysAllCount)

  //All the dates to arrary for chart labels in reverse order
  const labels = Object.keys(last30DaysAllCount).reverse()
  //All the counts to arrary for chart data
  const dataArr = Object.values(last30DaysAllCount).reverse()

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: 'Job',
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        fill: false,
        data: dataArr,
      },
    ],
    legends: [{ title: 'Job Posted', color: 'bg-teal-600' }],
  }

  console.log('chartDataset', lineData)

  return <ChartCard title="Jobs Posted">{<LineChart chartData={lineData} />}</ChartCard>
}
