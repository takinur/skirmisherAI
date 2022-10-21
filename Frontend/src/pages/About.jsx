import React from 'react'
import { useTitle } from '../hooks/useTitle'
import GuestLayout from './Layout/Guest'

export const AboutPage = () => {
  useTitle('Learn About US')

  return (
    <GuestLayout>
      <div>About -Why i am protected again?</div>
    </GuestLayout>
  )
}
