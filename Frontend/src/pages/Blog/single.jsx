import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import GuestLayout from '../Layout/Guest'

import { axiosInstance as API } from '../../api/axiosInstance'

export const SinglePost = () => {
  const { slug } = useParams()

  // React query to fetch Blog Post
  const { isLoading, data: post } = useQuery(
    'posts',
    async () => {
      const res = await API.get(`/v1/blog/${slug}`)
      return res.data
    },
    {
      refetchOnWindowFocus: true,
      retry: 2,
    }
  )

  useTitle(`${post?.title} || Blog | Community`)

  // console.log('From Single Post Data:', post)

  return (
    <GuestLayout>
      <div className="wrapper mx-auto mb-auto max-w-screen-2xl bg-slate-50 px-20 pt-32 pb-10">
        {post && (
          <div className="main-section grid grid-flow-row">
            <span className="text-center font-semibold text-gray-500">
              {' '}
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <h1 className="md:leading-14 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-8 grid grid-cols-4 gap-6 border-t-2 pt-8">
              <div className="w-full">
                <span className=" font-sans ">Author</span>
                <h1 className="text-2xl font-semibold text-gray-700">{post.author_name}</h1>
                <div className="mt-6 border-t-2 pt-6">
                  <span className="font-sans">Tags</span>
                  <div className="mt-4">
                    {post.tags.split(',').map((tag, index) => (
                      <span key={index} className="mr-2 rounded-full bg-gray-200 py-1 px-3 text-sm font-semibold text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <article className="prose prose-lg text-gray-600 dark:text-gray-300">
                  {post.description}
                </article>
                <div className="mt-8 flex border-y-2 p-4 ">
                  <span className="font-sans">Discuss on Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mt-1 ml-1 h-5 w-5 text-teal-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>

                  <span className="ml-1 font-sans"> Share on other platforms</span>
                </div>
                <div className="mt- flex justify-center p-4 ">
                  <span className="cursor-pointer font-sans hover:text-teal-500">
                    Load Comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GuestLayout>
  )
}
