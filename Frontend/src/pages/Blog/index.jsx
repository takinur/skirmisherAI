import React from 'react'
import { useTitle } from '../../hooks/useTitle'
import GuestLayout from '../Layout/Guest'

import { BlogCard } from '../../components/Card/Blog'
import { useQuery } from 'react-query'
import { axiosInstance as API } from '../../api/axiosInstance'

const index = () => {
  useTitle('Community | Blog | Discussions')

  // React query to fetch Blog Posts
  const { isLoading, data: posts } = useQuery(
    'posts',
    async () => {
      const res = await API.get(`/v1/blog/`)
      return res.data
    },
    {
      refetchOnWindowFocus: true,
      retry: 2,
    }
  )

  const conditionalRender = () => {
    if (isLoading)
      return (
        <div className="flex justify-center">
          <div className="loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
        </div>
      )
    if (posts && posts.length === 0)
      return (
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold text-gray-600">No Posts Found</h1>
        </div>
      )
    if (posts && posts.length > 0) {
      return posts.map((post) => (
        <BlogCard
          key={post.id}
          title={post.title}
          description={post.description}
          slug={post.slug}
          tags={post.tags}
          created_at={post.created_at}
        />
      ))
    }
  }

  return (
    <GuestLayout>
      <div className="bg-secondary-gradient container hidden h-24 w-full md:block "></div>
      <div className="wrapper mx-auto mb-auto max-w-screen-2xl px-20 pt-32 pb-10">
        <div className="main-section">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl">
            Latest Community Posts
          </h1>
          <h4 className="mt-2 text-gray-600"> Engage and Explore our Community</h4>

          <div className="mt-10 grid grid-flow-row border-t-2">{conditionalRender()}</div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default index
