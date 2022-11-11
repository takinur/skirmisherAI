import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthLayout from '../Layout/Auth'
import { useQuery } from 'react-query'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import classNames from 'classnames'

import ButtonDefault from '../../components/ButtonDefault'
import { Applications, ApplicationsSkeleton } from '../../components/Card/Applications'
import { FaChevronLeft } from 'react-icons/fa'
import { useEffect } from 'react'
import { useTitle } from '../../hooks/useTitle'

export const JobDetails = () => {
  useTitle('Job Details')
  const navigate = useNavigate()
  const API = useAxiosPrivate()

  const { id } = useParams()

  //Fetch Job
  const { data: job, isLoading: isJobLoading } = useQuery(
    'job',
    async () => {
      const res = await API.get(`/jobs/${id}/`)
      return res.data
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )

  useEffect(() => {
    if (!id && id !== undefined) {
      navigate('/employer/jobs')
    }
  }, [])

  //Fetch Job Applications
  const { isLoading: isAppLoading, data } = useQuery(
    'applications',
    async () => {
      const res = await API.get(`/v1/application-dashboard/?job_id=${id}`)
      return res.data
    },
    {
      refetchOnWindowFocus: true,
      retry: 1,
    }
  )

  const isLoading = isAppLoading || isJobLoading

  const conditionalRender = () => {
    if (isLoading) {
      return (
        <>
          <ApplicationsSkeleton />
          <ApplicationsSkeleton />
          <ApplicationsSkeleton />
        </>
      )
    } else if (data.length === 0) {
      return <p className="text-center text-gray-500">No applications yet</p>
    } else {
      return data.map((item, index) => <Applications key={item.id} {...item} index={index} />)
    }
  }

  console.log('Feteched applciations', data)

  return (
    <AuthLayout title="View Job Details">
      <ButtonDefault
        onClick={() => navigate(-1)}
        className={classNames('ml-1 !bg-gray-700 md:mt-2')}
      >
        <FaChevronLeft className="mr-1" /> Back to Jobs
      </ButtonDefault>

      <div className="wrapper pb-20">
        <div className="mt-4 justify-between px-8 md:flex">
          <div className="text-2xl font-bold text-gray-600 md:ml-20">{job && job?.title}</div>
          <div className=" text-sm font-semibold text-gray-800">
            Sort by: <span className="post-time">Most Suitable</span>
            <span className="menu-icon">▼</span>
          </div>
        </div>

        <div className="mt-1 grid grid-cols-1 gap-4">
          <div className="wrapper flex w-full px-5 md:h-20 ">
            <div className="has-rank my-auto flex w-24 items-center justify-center">
              <span className="font-serif text-3xl font-bold text-gray-600">{/* # */}</span>
            </div>
            <div className="relative grid w-full grid-cols-7 items-center gap-4">
              <div className="col-span-3 pl-4 font-bold text-gray-600">Candidate Name</div>
              <div className="font-bold text-gray-600 ">Skill Match</div>
              <div className=" font-bold text-gray-600">Suitability</div>
              <div className="font-bold text-gray-600"> Applied </div>
              <div className="font-bold text-gray-600"> Action </div>
            </div>
          </div>
          {conditionalRender()}
        </div>
      </div>
    </AuthLayout>
  )
}
