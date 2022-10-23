import React from 'react'
import { useTitle } from '../../hooks/useTitle'

import AuthLayout from '../Layout/Auth'

import { CSVLink } from 'react-csv'
import { format } from 'date-fns'

export const Reports = () => {
  useTitle('Reports')

  // const API = useAxiosPrivate()

  //Current date and time
  const currentDT = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

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
    </AuthLayout>
  )
}
