import React from 'react'
import { useTitle } from '../../hooks/useTitle'

import AuthLayout from '../Layout/Auth'

export const Reports = () => {
  useTitle('Reports')

  // const API = useAxiosPrivate()

  return (
    <AuthLayout title="Reports">
      <div>Reports</div>
    </AuthLayout>
  )
}
