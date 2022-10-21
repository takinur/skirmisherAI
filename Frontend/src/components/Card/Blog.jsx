import React from 'react'
import { Link } from 'react-router-dom'

export const BlogCard = ({ title, description, tags, slug, created_at }) => {
  //Create a new array of tags
  const tagsArray = tags.split(',')

  return (
    <article>
      <div className="space-y-2 pt-12 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <span className="text">
              {new Date(created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </dd>
        </dl>
        <div className="space-y-5 xl:col-span-3">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                <Link to={`/community/${slug}`} className="text-gray-900 dark:text-gray-100">
                  {title}
                </Link>
              </h2>
              <div className="flex flex-wrap">
                {tagsArray.map((tag, index) => (
                  <span key={index} className="mr-2 font-semibold uppercase text-teal-500">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              {description.substring(0, 200) + '...'}
            </div>
          </div>
          <div className=" text-base font-medium leading-6">
            <Link
              to={`/community/${slug}`}
              className="flex text-teal-500  hover:text-teal-600"
              aria-label={`Read "${title}"`}
            >
              Read more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 mt-0.5 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
