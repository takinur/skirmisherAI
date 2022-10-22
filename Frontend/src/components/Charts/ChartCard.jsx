import React from 'react'

const ChartCard = ({ children, title }) => {
  return (
    <div className="shadow-xs min-w-0 rounded-lg bg-white p-4 dark:bg-gray-800">
      <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">{title}</p>
      {children}
    </div>
  )
}
export default ChartCard
