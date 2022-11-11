import React from 'react'
import classNames from 'classnames'

const ProgressCircle = ({ value, className }) => {
  //Change the color of the progress circle based on the value
  const color =
    value < 20
      ? 'text-red-500'
      : value < 40
      ? 'text-yellow-500'
      : value < 60
      ? 'text-teal-500'
      : value < 80
      ? 'text-indigo-500'
      : 'text-green-500'

  const circumference = 20 * 2 * Math.PI // 50 is the radius of the circle

  return (
    <div className="relative">
      <div className=" relative flex items-center justify-center overflow-hidden rounded-full ">
        <svg className={classNames('h-14 w-14 ', className)} aria-hidden="true">
          <circle
            className="text-gray-700 shadow-sm"
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="30"
            cy="30"
          />
          <circle
            className={classNames('transition-all duration-500 ease-in-out', color)}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (value / 100) * circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="20"
            cx="30"
            cy="30"
          />
        </svg>
        <span className="absolute mt-1.5 ml-1.5 text-sm text-gray-700">{value}%</span>
      </div>
    </div>
  )
}

export default ProgressCircle
