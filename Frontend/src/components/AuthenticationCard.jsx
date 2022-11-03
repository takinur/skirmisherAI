import React from 'react'

export default function AuthenticationCard({ children }) {
  return (
    <div className="bg-secondary-gradient flex flex-col items-center  pt-6 sm:justify-center sm:pt-0 md:min-h-screen">
      <div>LOGO</div>

      <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}
