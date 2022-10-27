import React from 'react'
import { useQuery } from 'react-query'
import { Loading } from '../../components/Loading'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useCandProfile } from '../../hooks/useProfile'
import AuthLayout from '../Layout/Auth'
import { relativeTime } from '../../hooks/useRelativetime'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useTitle } from '../../hooks/useTitle'

export const Jobs = () => {
  const API = useAxiosPrivate()
  useTitle('View applied Jobs ')

  //Custom hook to check if user profile exist
  const { data: profile } = useCandProfile()
  //State to check if profile exist
  const isEnabled = profile !== undefined || null ? true : false

  // React query to fetch Jobs
  const { isLoading, data } = useQuery(
    'applications',
    async () => {
      const res = await API.get(`/v1/application/?cand_id=${profile?.id}`)
      return res.data
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: isEnabled, //Disable query if Profile is null / undefined
    }
  )

  if (isLoading) return <h1> Loading</h1>

  console.log('fetched applications', data)

  return (
    <AuthLayout title="Jobs that you applied">
      <div className="flex flex-col">
        {
          //No jobs found
          data?.length < 1 || data === undefined ? (
            <div className="flex flex-col items-center justify-center ">
              <h2 className="text-2xl font-bold text-gray-500">No Jobs Found</h2>
              <p className="text-gray-500">You have not applied to any job yet</p>
              <Link to="/find-work" className="mt-6 text-2xl font-bold text-teal-600 ">
                {' '}
                Find Jobs
              </Link>
            </div>
          ) : (
            //Jobs found
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-500">Applied Jobs</h2>
          )
        }

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          ) : (
            data?.map((job, index) => (
              <div
                key={job.id}
                className="relative flex items-start rounded-xl bg-white p-4 shadow-lg"
              >
                <div
                  className={classNames(
                    'absolute bottom-0 right-0 rounded-tl-xl rounded-br-xl px-2 py-1 text-white',
                    job.status.toLowerCase() === 'applied' ? 'bg-red-600' : 'bg-green-600'
                  )}
                >
                  <span className="text-xs">{job.status}</span>
                </div>

                <div className="my-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                  <span className="text-3xl font-bold text-blue-500">
                    {
                      // show index in reverse order
                      data.length - index
                    }
                  </span>
                </div>

                <div className="ml-4 mt-1">
                  <h2 className="font-semibold">{job.job_title}</h2>
                  <p className="text-sm text-gray-500">{job.employer}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Applied {relativeTime(job.created_at)}
                  </p>
                  {
                    // Show Interview button if status is applied
                    job.status.toLowerCase() === 'invited' && (
                      <div className="mt-2 text-sm text-gray-500">
                        <div>
                          <b>Interview at:</b> {job?.invitation.schedule}
                        </div>
                        <Link
                          className="text-xl font-bold text-teal-500"
                          to={`/meet/${job?.invitation.meet_url}`}
                        >
                          Join
                        </Link>
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
