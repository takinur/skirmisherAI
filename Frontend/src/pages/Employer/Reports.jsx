import React, { useState } from 'react'
import { useTitle } from '../../hooks/useTitle'

import AuthLayout from '../Layout/Auth'

import { CSVDownload, CSVLink } from 'react-csv'
import { format } from 'date-fns'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useProfile } from '../../hooks/useProfile'
import { useQuery } from 'react-query'

import { LineChart } from '../../components/Charts'
import ChartCard from '../../components/Charts/ChartCard'
import { BarChart } from '../../components/Charts/BarChart'
import { Loading } from '../../components/Loading'
import { SelectListBox } from '../../components/SelectDropdown'

// TODO: Add 2 more reports to this page
// 1. Applicants applied in the last 30 days
// 2. Applicants hired in the last 30 days
//FIx the chart to show the correct data

// TODO: HELP PAGE next target

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

  const conditionalRender = () => {
    if (empLoading || isLoading) return <div>Loading...</div>
    if (empErr) return <div>Something went wrong!</div>

    if (jobs) {
      //Remove ID and updated_at from the jobs array
      const jobsWithoutID = jobs.map(({ id, updated_at, ...rest }) => rest)
      //Format the date to yyyy-MM-dd HH:mm:ss
      const jobsFormatted = jobsWithoutID.map((job) => {
        return {
          ...job,
          created_at: format(new Date(job.created_at), 'yyyy-MM-dd'),
        }
      })

      return (
        <div className="wrapper">
          <JobsPosted data={jobs} jobsFormatted={jobsFormatted} currentDT={currentDT} />
          <hr />
          <JobsApplications
            API={API}
            data={jobs}
            jobsFormatted={jobsFormatted}
            currentDT={currentDT}
          />
        </div>
      )
    }
  }

  return <AuthLayout title="Reports">{conditionalRender()}</AuthLayout>
}

const JobsPosted = ({ data, jobsFormatted, currentDT }) => {
  //Jobs Posted per day over time
  const jobsPostedPerDay = data.reduce((acc, job) => {
    const date = format(new Date(job.created_at), 'dd-MMM-yyyy')
    if (acc[date]) {
      acc[date] += 1
    } else {
      acc[date] = 1
    }
    return acc
  }, {})

  // console.log('ddd', jobsPostedPerDay)

  //All the dates to arrary for chart lables
  const labels = Object.keys(jobsPostedPerDay).reverse()
  //All the counts to arrary for chart data
  const dataArr = Object.values(jobsPostedPerDay).reverse()

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

  //Export to CSV
  const csvHeaders = [
    { label: 'Job Title', key: 'title' },
    { label: 'Job Type', key: 'type' },
    { label: 'Job Category', key: 'level' },
    { label: 'Job Location', key: 'work_location' },
    { label: 'Job Salary', key: 'salary' },
    { label: 'Job Description', key: 'description' },
    { label: 'Job Requirements', key: 'qualifications' },
    { label: 'Job Posted Date', key: 'created_at' },
  ]

  return (
    <section className="my-8 gap-6 md:grid md:grid-cols-4">
      <div className="col-span-3">
        <ChartCard title="Jobs Posted">{<LineChart chartData={lineData} />}</ChartCard>
      </div>
      <div className="mt-4 md:col-span-1 md:mt-0 ">
        <h2 className="border-b-2 border-b-gray-900 py-3 text-2xl font-bold text-gray-700">
          {' '}
          Download or Export Jobs{' '}
        </h2>
        <div className="mt-6">
          <CSVLink
            data={jobsFormatted}
            headers={csvHeaders}
            filename={`Jobs_${currentDT}_SkirmisherAI.csv`}
            className="focus:shadow-outline flex rounded bg-teal-600 py-2 px-4 font-bold text-gray-100 hover:bg-teal-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-4 h-12 w-12 text-blue-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>{' '}
            Last Updated on {currentDT}
          </CSVLink>
        </div>
        <div className="mt-4">
          <span className="text-gray-700">Total Jobs Posted: {data.length}</span>

          <button
            disabled
            className="focus:shadow-outline mt-4 flex rounded bg-gray-600 py-2 px-4 font-bold text-gray-100 focus:outline-none disabled:opacity-50  md:ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
              />
            </svg>
            Print
          </button>
        </div>
      </div>
    </section>
  )
}
const JobsApplications = ({ data, currentDT, API }) => {
  //Data to name and ID for select options
  const applications = data.map((item) => {
    return { value: item.id, name: item.title }
  })

  const [job, setJob] = useState(applications[1])

  // console.log('Selected Job', job)

  //Return the selected job data with react query
  const {
    data: jobData,
    isLoading,
    isError,
  } = useQuery(
    ['jobDetails', job],
    async () => {
      const res = await API.get(`/v1/application-dashboard/?job_id=${job.value}`)
      return res.data
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      // enabled: isEnbled,
    }
  )

  // console.log(`Returned Job Data for ${job.value}`, jobData)

  if (isLoading) return <Loading />

  // //Suitability and Skill Match of each job application
  const suitability = jobData?.map((item) => item.total_score)
  const skillMatch = jobData?.map((item) => item.skill_score)

  const labels = jobData?.map((item) => item.id + '-' + item.candidate.name.slice(0, 5))
  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Suitability',
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        fill: false,
        data: suitability,
      },
      {
        label: 'Skill Match',
        backgroundColor: '#7e3af2',
        borderColor: '#7e3af2',
        fill: false,
        data: skillMatch,
      },
    ],
    legends: [
      { title: 'Suitability', color: 'bg-teal-600' },
      { title: 'Skill Match', color: 'bg-purple-600' },
    ],
  }

  //Format the date to yyyy-MM-dd HH:mm:ss
  const jobFormatted = jobData.map((job) => {
    return {
      ...job,
      created_at: format(new Date(job.created_at), 'yyyy-MM-dd'),
    }
  })

  //Export to CSV
  const csvHeaders = [
    { label: 'Job Title', key: 'job_title' },
    { label: 'Candidate Name', key: 'candidate.name' },
    { label: 'Skills Match', key: 'skill_score' },
    { label: 'Suitability', key: 'total_score' },
    { label: 'Applied', key: 'created_at' },
    { label: 'Candidate Title', key: 'candidate.designation' },
    { label: 'Email', key: 'candidate.email' },
    { label: 'Location', key: 'candidate.location' },
    { label: 'Phone', key: 'candidate.phone' },
  ]

  return (
    <section className="my-8 gap-6 md:grid md:grid-cols-4">
      <div className="col-span-3 grid grid-flow-row gap-4">
        <SelectListBox items={applications} selected={job} setSelected={setJob} />

        <ChartCard title="Jobs Applications">{<BarChart chartData={barData} />}</ChartCard>
      </div>
      <div className="mt-4 md:col-span-1 md:mt-0 ">
        <h2 className="border-b-2 border-b-gray-900 py-3 text-2xl font-bold text-gray-700">
          {' '}
          Export Job Applications{' '}
        </h2>
        <div className="mt-6">
          <CSVLink
            data={jobFormatted}
            headers={csvHeaders}
            filename={`${jobFormatted[0]?.job_title}_Applications_${currentDT}.csv`}
            className="focus:shadow-outline flex rounded bg-green-700 py-2 px-4 font-bold text-gray-100 hover:bg-green-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-4 h-12 w-12 text-blue-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>{' '}
            Last Updated on {currentDT}
          </CSVLink>
        </div>
        <div className="mt-4">
          <span className="text-gray-700">Total Applications: {jobData.length}</span>

          <button
            disabled
            className="focus:shadow-outline mt-4 flex rounded bg-gray-600 py-2 px-4 font-bold text-gray-100 focus:outline-none disabled:opacity-50  md:ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
              />
            </svg>
            Print
          </button>
        </div>
      </div>
    </section>
  )
}
