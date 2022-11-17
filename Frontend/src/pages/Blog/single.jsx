import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useTitle } from '../../hooks/useTitle'
import GuestLayout from '../Layout/Guest'

import { axiosInstance as API } from '../../api/axiosInstance'
import TextArea from '../../components/TextArea'
import ButtonDefault from '../../components/ButtonDefault'
import Input from '../../components/Input'

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

  const conditionalRender = () => {
    if (isLoading)
      return (
        <div className="flex justify-center">
          <div className="loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
        </div>
      )
    if (post) {
      return (
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
          <div className="mt-8 grid-cols-4 gap-6 border-t-2 pt-8 md:grid">
            <div className="w-full">
              <span className=" font-sans ">Author</span>
              <h1 className="text-2xl font-semibold text-gray-700">{post.author_name}</h1>
              <div className="flex w-full flex-col md:mt-4 ">
                <div className="mt-2 space-x-1 space-y-2 p-1 text-justify">
                  {post?.tags &&
                    post.tags.split(',').map((tag, index) => (
                      <button
                        key={index}
                        className="rounded-full bg-gray-300 px-3 py-1 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-400 hover:shadow-2xl"
                      >
                        {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-span-3 mt-8 md:mt-0">
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
                  Load Discussions
                </span>
              </div>

              <section className=" py-8 dark:bg-gray-900 lg:py-16">
                <div className="mr-auto max-w-2xl pl-4">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
                      Discussion (20)
                    </h2>
                  </div>
                  <form className="mb-6">
                    <div className="mb-4 rounded-lg rounded-t-lg  py-2  dark:border-gray-700 dark:bg-gray-800">
                      <Input
                        type="text"
                        required
                        placeholder="Name"
                        className="w-full bg-slate-200"
                      />
                      <label for="comment" className="sr-only">
                        Your comment
                      </label>
                      <TextArea
                        required
                        className="mt-2 h-24 w-full bg-slate-200"
                        placeholder="Write your opinion here"
                      />
                    </div>
                    <div className="flex w-full justify-end ">
                      <ButtonDefault>Post</ButtonDefault>
                    </div>
                  </form>
                  <article className="mb-6 rounded-lg bg-slate-300 p-6 text-base dark:bg-gray-900">
                    <footer className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                          <svg
                            className="mr-1 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              filRule="evenodd"
                              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            ></path>
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className=" font-bold">Michael Gough </span>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <time pubdate datetime="2022-02-08" title="February 8th, 2022">
                            Feb. 8, 2022
                          </time>
                        </p>
                      </div>
                      <button
                        id="dropdownComment1Button"
                        data-dropdown-toggle="dropdownComment1"
                        className="inline-flex items-center rounded-lg bg-slate-200 p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100"
                        type="button"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span className="sr-only">Comment settings</span>
                      </button>
                    </footer>
                    <p className="mt-2 font-saira text-gray-900 ">
                      Very straight-to-point article. Really worth time reading. Thank you! But
                      tools are just the instruments for the UX designers. The knowledge of the
                      design tools are as important as the creation of the design strategy.
                    </p>
                    <div className="mt-4 flex items-center space-x-4">
                      <button
                        type="button"
                        className="flex items-center text-sm text-gray-700 hover:underline "
                      >
                        <svg
                          aria-hidden="true"
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>
                        Reply
                      </button>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <GuestLayout>
      <div className="bg-secondary-gradient hidden h-24 w-full md:block "></div>
      <div className="wrapper mx-auto mb-auto max-w-screen-2xl bg-slate-50 px-20 pt-32 pb-10">
        {conditionalRender()}
      </div>
    </GuestLayout>
  )
}
