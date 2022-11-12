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
import { useState } from 'react'

export const JobDetails = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useTitle('Job Details')
  const navigate = useNavigate()
  const API = useAxiosPrivate()

  const { id } = useParams()

  const [sort, setSort] = useState('desc')

  useEffect(() => {
    if (!id && id !== undefined) {
      navigate('/employer/jobs')
    }
  }, [])

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

  const handleSort = () => {
    if (sort === 'desc') {
      setSort('asc')
    } else {
      setSort('desc')
    }
  }

  const sortedData = data?.sort((a, b) => {
    if (sort === 'asc') {
      return new Date(b.created_at) - new Date(a.created_at)
    } else {
      return new Date(a.created_at) - new Date(b.created_at)
    }
  })

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
      return sortedData.map((item, index) => <Applications key={item.id} {...item} index={index} />)
    }
  }

  // console.log('Feteched applciations', data)

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
          <div className="text-2xl font-bold text-gray-600 md:ml-20">
            {job && job?.title} - Applications
          </div>
          <div className="flex justify-start text-sm font-semibold text-gray-800">
            Sort by:{' '}
            <button onClick={handleSort} className="post-time ml-1 flex cursor-pointer ">
              {sort === 'desc' ? 'Most Suitable' : 'Applied Date'}
              {sort === 'desc' ? <SortIconDesc /> : <SortIconAsc />}
            </button>
          </div>
        </div>

        <div className=" mt-1 grid grid-cols-1 gap-4 ">
          <div className="wrapper flex w-full px-5 md:h-20 ">
            <div className="has-rank my-auto flex w-24 items-center justify-center">
              <span className="font-serif text-3xl font-bold text-gray-600">{/* # */}</span>
            </div>
            <div className="relative grid w-full grid-cols-7 items-center gap-4">
              <div className="col-span-2 pl-4 font-bold text-gray-600">Candidate Name</div>
              <div className="font-bold text-gray-600">Email</div>
              <div className="pl-6 font-bold text-gray-600 ">Skill Match</div>
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

const SortIconDesc = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 5h10"></path>
    <path d="M11 9h7"></path>
    <path d="M11 13h4"></path>
    <path d="m3 17 3 3 3-3"></path>
    <path d="M6 18V4"></path>
  </svg>
)

const SortIconAsc = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 11H15"></path>
    <path d="M11 15H18"></path>
    <path d="M11 19H21"></path>
    <path d="M9 7L6 4L3 7"></path>
    <path d="M6 6L6 20"></path>
  </svg>
)
