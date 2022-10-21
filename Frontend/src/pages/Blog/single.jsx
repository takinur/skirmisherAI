import React from 'react'
import { useParams } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import GuestLayout from '../Layout/Guest'

export const SinglePost = () => {
  const { slug } = useParams()

  useTitle(`${slug} || Blog | Community`)

  return (
    <GuestLayout>
      <div className="wrapper mx-auto mb-auto max-w-screen-2xl bg-slate-50 px-20 pt-32 pb-10">
        <div className="main-section grid grid-flow-row">
          <span className="text-center font-semibold text-gray-500"> Sunday May 2025</span>
          <h1 className="md:leading-14 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl">
            How to get Started with React
          </h1>
          <div className="mt-8 grid grid-cols-4 gap-6 border-t-2 pt-8">
            <div className="w-full">
              <span className=" font-sans ">Author</span>
              <h1 className="text-2xl font-semibold text-gray-700">John Doe</h1>
              <div className="mt-6 border-t-2 pt-6">
                <span className="font-sans">Tags</span>
                <div className="mt-4">
                  <span className="mr-2 rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    React
                  </span>
                  <span className="mr-2 rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                    Javascript
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-3">
              THE post of the century oh no lets check Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Consequatur sequi accusantium debitis quaerat aspernatur dolores,
              consequuntur, nostrum, molestiae omnis doloribus ea. Molestiae doloribus consectetur
              eveniet minima dicta optio nulla temporibus!
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}
