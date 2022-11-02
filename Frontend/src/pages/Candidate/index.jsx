import React from 'react'
import { Greeting } from '../../components/Greeting'
import { NoExInfo } from '../../components/Alerts'
import { Loading } from '../../components/Loading'
import { useCandProfile } from '../../hooks/useProfile'
import { useTitle } from '../../hooks/useTitle'
import { useQuery } from 'react-query'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

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

  //Conditional rendering
  const rednderDetails = () => {
    if (isLoading || candLoading) return <Loading />
    if (isError && error.request.status === 400)
      return <NoExInfo to="/user/profile" text="Upload your Resume to Get Started! " />
    // if (data) return <Greeting data={data} />;
  }

  return (
    <div className="h-full">
      <Greeting props={user} />

      <div className="mt-4 min-h-screen w-full rounded-md bg-slate-100">{rednderDetails()}</div>
    </div>
  )
}
