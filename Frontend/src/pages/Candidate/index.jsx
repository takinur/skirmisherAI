import React from 'react'
import { Greeting } from '../../components/Greeting'
import { NoExInfo } from '../../components/Alerts'
import { Loading } from '../../components/Loading'
import { useCandProfile } from '../../hooks/useProfile'
import { useTitle } from '../../hooks/useTitle'
import { useQuery } from 'react-query'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import ChartCard from '../../components/Charts/ChartCard'
import { DoughnutChart } from '../../components/Charts/Doughnut'
import { LineChart } from '../../components/Charts'

export const CandidateDashboard = () => {
  useTitle('Candidate Dashboard')
  const API = useAxiosPrivate()

  //Fetch profile
  const { isLoading: candLoading, isError, error, data: candidate, user } = useCandProfile()

  //State to check if profile exist
  const isEnabled = candidate !== undefined || null ? true : false

  // React query to fetch Dashboard Data
  const { isLoading, data } = useQuery(
    'dashboardData',
    async () => {
      const res = await API.get(`/v1/stats/employer/?emp_id=${candidate?.id}`)
      return res.data
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: isEnabled, //Disable query if candidate is null / undefined
    }
  )

  console.log(data)

  //Conditional rendering
  const renderDetails = () => {
    if (isLoading || candLoading) return <Loading />
    if (isError && error.request.status === 400)
      return <NoExInfo to="/user/profile" text="Upload your Resume to Get Started! " />
    if (data)
      return (
        <>
          <SummaryStats data={data} />
          <ChartsRender data={data} />
        </>
      )
  }

  return (
    <div className="h-full px-4">
      <Greeting props={user} />

      <div className="mt-4 min-h-screen w-full rounded-md  dark:bg-slate-400">
        {renderDetails()}
      </div>
    </div>
  )
}

const SummaryStats = ({ data }) => (
  <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-green-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-green-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
          />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold text-gray-600">Job Posted</h2>
        <p className="mt-2 font-bold text-gray-800">{data.jobs} </p>
      </div>
    </div>

    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-indigo-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold text-gray-600"> Application Received</h2>
        <p className="mt-2 font-bold text-gray-800">{data.applications}</p>
      </div>
    </div>

    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-100 bg-teal-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-teal-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
          />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold text-gray-600">Applicant Shortlisted</h2>
        <p className="mt-2 font-bold text-gray-800">{data.shortlisted}</p>
      </div>
    </div>
    <div className="flex items-start rounded-xl bg-white p-4 shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-red-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
          />
        </svg>
      </div>

      <div className="ml-4">
        <h2 className="font-semibold text-gray-600">Community Posts</h2>
        <p className="mt-2 font-bold text-gray-800">{data.blogs}</p>
      </div>
    </div>
  </div>
)

const ChartsRender = ({ data }) => {
  const lineData = {
    labels: data.week_labels,
    datasets: [
      {
        label: 'Application',
        backgroundColor: '#0694a2',
        borderColor: '#0694a2',
        fill: false,
        data: data.week_app,
      },
      {
        label: 'Shortlisted',
        backgroundColor: '#7e3af2',
        borderColor: '#7e3af2',
        fill: false,
        data: data.week_invited,
      },
    ],
    legends: [
      { title: 'Application Received', color: 'bg-teal-600' },
      { title: 'Shortlisted', color: 'bg-purple-600' },
    ],
  }

  const doughnutData = {
    labels: ['Jobs', 'Applicants', 'Invited', 'Rejected'],
    datasets: [data.jobs, data.applications, data.shortlisted, Math.floor(Math.random() * 7)],
    legends: [
      {
        title: 'Jobs',
        color: 'bg-indigo-500',
      },
      {
        title: 'Applicants',
        color: 'bg-blue-600',
      },
      {
        title: 'Invited',
        color: 'bg-teal-600',
      },
      {
        title: 'Rejected',
        color: 'bg-red-500',
      },
    ],
  }

  return (
    <div className="my-8 grid gap-6 md:grid-cols-2">
      <ChartCard title="Job Apllications in Week">
        <LineChart chartData={lineData} />
      </ChartCard>
      <ChartCard title="Overall Total">
        <DoughnutChart chartData={doughnutData} />
      </ChartCard>
    </div>
  )
}
