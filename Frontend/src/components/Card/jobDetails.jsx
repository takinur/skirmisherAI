import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { relativeTime } from '../../hooks/useRelativetime'
import { toast } from 'react-toastify'
import { FaCheckCircle } from 'react-icons/fa'

export const jobDetails = (props) => {
  const applicant = props.applicant
  const canApply = props.canApply
  const job = props.job

  // console.log("Job", job);
  const [saved, setSaved] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  const API = useAxiosPrivate()

  // Check if user has applied for this job
  useEffect(() => {
    if (applicant) {
      API.get(`v1/application/?cand_id=${applicant}`).then((res) => {
        const applied = res.data.filter((app) => app.applied_job_id === job.id)
        if (applied.length > 0) {
          setIsApplied(true)
        }
      })
    }
  }, [applicant, job.id])

  //Apply for Job
  const applyMutation = useMutation(async (data) => await API.post('v1/application/', data))

  const handleApply = () => {
    const data = {}
    data.vacancy = job.id
    data.candidate = applicant
    data.status = 'Applied'

    // console.log("Appply to this job: ", data);
    applyMutation.mutate(data)
  }

  const handleWishlist = (jobId) => {
    console.log('Wishlisted', jobId)
    setSaved(!saved)
  }

  //Show success message if the user has applied for the job
  useEffect(() => {
    if (applyMutation.isSuccess) {
      toast.success('Applied Successfully.')
      setIsApplied(true)
    }
    if (applyMutation.error) {
      let err = applyMutation.error.response.data

      toast.error('Something went wrong.')

      console.log('Error updating Profile', err)
    }
  }, [applyMutation.isSuccess, applyMutation.error])

  const isDisabled = applyMutation.isLoading || applyMutation.isSuccess

  const showApplyButton = () => {
    if (isApplied) {
      return (
        <div className="float-right -mt-6 ml-4 mr-2  flex  text-base font-semibold  text-green-700 ">
          <span>Applied</span> <FaCheckCircle className="ml-1 mt-1" />
        </div>
      )
    } else if (canApply === 'CAN_APPLY') {
      return (
        <button
          disabled={isDisabled}
          onClick={handleApply}
          className="float-right -mt-6 ml-4 mr-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Apply Now
        </button>
      )
    } else if (canApply === 'PROFILE_NOT_COMPLETE') {
      return (
        <Link
          to={'/user/profile'}
          className="float-right -mt-6 ml-4 mr-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Complete your Profile to Apply
        </Link>
      )
    } else if (canApply === 'NOT_CANDIDATE') {
      return (
        <div className="float-right -mt-6 ml-4 mr-2 rounded-md px-4 py-2 text-sm font-semibold text-red-500  ">
          You can't apply for this job!
        </div>
      )
    } else {
      return (
        <Link
          to="/login"
          className="float-right -mt-6 ml-4 mr-2 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 "
        >
          Login to Apply
        </Link>
      )
    }
  }

  return (
    <>
      <div className="flex h-40 w-full items-center justify-center rounded-t-md bg-gray-300 ">
        <span className="font-mono font-semibold text-gray-700">{job.employer?.slogan}</span>
      </div>
      <div className="z-10 -mt-8 h-16 w-16 bg-gray-100 shadow-md">
        {
          // Check if company logo is available
          job.employer?.logo ? (
            <img className="h-16 w-16" src={job.employer.logo} alt="company logo" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center  bg-green-700">
              <span className="text-4xl font-semibold text-gray-50">
                {job.employer.company_name.charAt(0)}
              </span>
            </div>
          )
        }
      </div>
      {showApplyButton()}

      <div className="px-8 pt-12">
        <div className="flex text-gray-800 ">
          <div className="text-2xl font-bold">{job.title}</div>
          <div className="ml-auto flex items-center">
            {canApply && (
              <div className="save-icon z-20 cursor-pointer " onClick={() => handleWishlist(2)}>
                <svg
                  className={classNames('h-6 w-6 hover:fill-gray-800 hover:text-gray-800 ', {
                    'text-gray-500': !saved,
                    'fill-gray-500 text-gray-500': saved,
                  })}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0l-1.1 1-1-1a5.5 5.5 0 00-7.8 7.8l1 1 7.8 7.8 7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
                </svg>
              </div>
            )}

            <svg
              className="ml-2 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <div className="font-xs text-gray-700">
            {job.employer?.company_name},<span className="loc ml-2">{job.employer?.location}</span>
          </div>
          <div className="font-xs text-gray-700">Posted {relativeTime(job.created_at)}</div>
        </div>
        <div className="font-xs mt-2 text-gray-700 ">
          <span className="loc flex">
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
                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
              />
            </svg>
            {job.employer?.size}
          </span>
          <span className="loc mt-1 flex">
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
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            {job.employer?.website}
          </span>
        </div>
        <div className="mt-5 justify-between rounded-2xl bg-gray-300 px-6 py-1 md:flex md:h-16">
          <div className="leading-7">
            <div className="whitespace-nowrap font-semibold text-gray-800">Experience</div>
            <div className="hitespace-nowrap font-sans text-gray-900">
              {job.experience ? job.experience : 'No Experience'}
            </div>
          </div>
          <div className="leading-7">
            <div className="whitespace-nowrap font-semibold text-gray-800">Employee Type</div>
            <div className="hitespace-nowrap font-sans text-gray-900">
              {job.type ? job.type : 'Full Time'}
            </div>
          </div>
          <div className="leading-7">
            <div className="whitespace-nowrap font-semibold text-gray-800">Salary</div>
            <div className="hitespace-nowrap font-sans text-gray-900">
              {
                //If dollar sign is not present in salary, add it
                job.salary && !job.salary.includes('$') ? '$' + job.salary : job.salary
              }
            </div>
          </div>
        </div>
        <div className="mt-8 w-full ">
          <div className="mb-7 font-semibold">Overview</div>
          <div className="mb-7 leading-8">{job.description}</div>
          <div className="mb-2 font-semibold">Qualifications</div>
          <div className="mt-4 flex w-full flex-col ">
            <div className="mb-7 space-x-1 space-y-2 p-1 text-justify">
              {
                //If qualifications are not present, show "Not Specified"
                job.qualifications
                  ? //extract each skill from skils string
                    job.qualifications.split(',').map((skill, index) => (
                      <button
                        key={index}
                        className="rounded-full bg-gray-300 px-3 py-1 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-400 hover:shadow-2xl"
                      >
                        {skill}
                      </button>
                    ))
                  : 'Not Specified'
              }
            </div>
          </div>

          <div className="mb-2 font-semibold">Benefits</div>
          <div className="mb-7 leading-8">
            {
              //If benefits are not present, show "Not Specified"
              job.benefits ? job.benefits : 'Not Specified'
            }
          </div>
          <div className="mb-2 font-semibold">Work Location</div>
          <div className="mb-7 leading-8">
            {
              //If location are not present, show "Not Specified"
              job.work_location ? job.work_location : 'Not Specified'
            }
          </div>
        </div>
      </div>
    </>
  )
}

export const JobDetailsLoading = () => {
  return (
    <>
      <div className="flex h-40 w-full  items-center justify-center rounded-t-md bg-gray-300  ">
        <div role="status" className="max-w-lg animate-pulse space-y-2.5 ">
          <div className="flex w-full items-center space-x-2">
            <div className="h-2.5 w-32 rounded-full bg-gray-700"></div>
            <div className="h-2.5 w-24 rounded-full bg-gray-600"></div>
            <div className="h-2.5 w-full rounded-full bg-gray-600"></div>
          </div>
          <div className="flex w-full max-w-[480px] items-center space-x-2">
            <div className="h-2.5 w-full rounded-full bg-gray-700"></div>
            <div className="h-2.5 w-full rounded-full bg-gray-600"></div>
            <div className="h-2.5 w-24 rounded-full bg-gray-600"></div>
          </div>
          <div className="flex w-full max-w-[400px] items-center space-x-2">
            <div className="h-2.5 w-full rounded-full bg-gray-600"></div>
            <div className="h-2.5 w-80 rounded-full bg-gray-700"></div>
            <div className="h-2.5 w-full rounded-full bg-gray-600"></div>
          </div>
        </div>
      </div>
      <div className="z-10 -mt-8 h-16 w-16 bg-gray-100 shadow-md">
        <div className="mt-3 flex justify-between"></div>
      </div>
      <div className="mx-auto w-full rounded-md  border-none p-4">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-700 dark:bg-slate-100"></div>
                <div className="col-span-1 h-2 rounded bg-slate-700 dark:bg-slate-100"></div>
              </div>
            </div>
            <div className="flex w-full items-center space-x-2">
              <div className="h-2 rounded-full bg-slate-700 dark:bg-slate-100 "></div>
              <div className="h-2 w-24 rounded-full bg-slate-700 dark:bg-slate-100"></div>
              <div className="h-2 w-full rounded-full bg-slate-700 dark:bg-slate-100"></div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 h-2 rounded bg-slate-700 dark:bg-slate-100"></div>
                <div className="col-span-2 h-2 rounded bg-slate-700 dark:bg-slate-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
