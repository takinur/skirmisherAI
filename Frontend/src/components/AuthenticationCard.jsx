import React from 'react'

export default function AuthenticationCard({ children }) {
  return (
    <div className="bg-secondary-gradient flex min-h-screen items-center p-4 lg:justify-center">
      <div className="container-main max mt-12 flex flex-col overflow-hidden rounded-md shadow-lg md:flex-1 md:flex-row lg:max-w-screen-md">
        {children}
      </div>
    </div>
  )
}
