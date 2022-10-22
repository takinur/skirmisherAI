import React from 'react'

function ChartLegend({ legends }) {
  return (
    <div className="mt-4 flex justify-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
      {legends.map((legend) => (
        <div className="flex items-center" key={legend.title}>
          <span className={`mr-1 inline-block h-3 w-3 ${legend.color} rounded-full`}></span>
          <span>{legend.title}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend
