import React from 'react'
import { useTitle } from '../../hooks/useTitle'
import GuestLayout from '../Layout/Guest'

const index = () => {
  useTitle('Community | Blog | Discussions')

  return (
    <GuestLayout>
      <div className="wrapper mx-auto mb-auto max-w-screen-2xl bg-white pt-32">
        <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl">
          Latest Community Posts
        </h1>
        <div>index</div>
      </div>
    </GuestLayout>
  )
}

export default index
