import React from 'react'
import { Greeting } from '../../components/Greeting'
import { NoExInfo } from '../../components/Alerts'
import { Loading } from '../../components/Loading'

import { useProfile } from '../../hooks/useProfile'

import { useTitle } from '../../hooks/useTitle'

export const EmployerDashboard = () => {
  useTitle('Employer Dashboard')
  //Custom hook to check if user profile exist
  const { isLoading: empLoading, isError: empErr, data: employer, user } = useProfile() //Pass retry Agument :INT

  console.log('From EMP dashindex Data:', employer)

  //Conditional rendering
  const renderDetails = () => {
    if (empLoading) return <Loading />
    if (empErr)
      return (
        <NoExInfo
          to="/user/profile"
          text="It seems that you have not provided additional details! "
        />
      )
    // if (data) return <Greeting data={data} />;
  }

  return (
    <div className="h-full">
      <Greeting props={user} />

      <div className="mt-4 min-h-screen w-full rounded-md bg-slate-100 dark:bg-slate-400">
        {renderDetails()}

        <div class="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>

            <div class="ml-4">
              <h2 class="font-semibold">574 Job Posted</h2>
              <p class="mt-2 text-sm text-gray-500">Last Posted 4 days ago</p>
            </div>
          </div>

          <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-orange-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <div class="ml-4">
              <h2 class="font-semibold">1823 Users</h2>
              <p class="mt-2 text-sm text-gray-500">Last checked 3 days ago</p>
            </div>
          </div>
          <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <div class="ml-4">
              <h2 class="font-semibold">548 Posts</h2>
              <p class="mt-2 text-sm text-gray-500">Last authored 1 day ago</p>
            </div>
          </div>
          <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>

            <div class="ml-4">
              <h2 class="font-semibold">129 Comments</h2>
              <p class="mt-2 text-sm text-gray-500">Last commented 8 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
