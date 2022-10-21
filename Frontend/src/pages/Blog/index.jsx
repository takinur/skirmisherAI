import React from 'react'
import { useTitle } from '../../hooks/useTitle'
import GuestLayout from '../Layout/Guest'

import { BlogCard } from '../../components/Card/Blog'

const posts = [
  {
    title: 'How to get started with React',
    description:
      'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.',
    slug: 'how-to-get-started-with-react',
    tags: ['react', 'javascript'],
  },
]

const index = () => {
  useTitle('Community | Blog | Discussions')

  return (
    <GuestLayout>
      <div className="wrapper mx-auto mb-auto max-w-screen-2xl bg-slate-50 px-20 pt-32 pb-10">
        <div className="main-section">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl">
            Latest Community Posts
          </h1>
          <h4 className="mt-2 text-gray-600"> Engage and Explore our Community</h4>

          <div className="mt-10 grid grid-flow-row">
            {posts.map((post) => (
              <BlogCard
                key={post.title}
                title={post.title}
                description={post.description}
                slug={post.slug}
                tags={post.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}

export default index
