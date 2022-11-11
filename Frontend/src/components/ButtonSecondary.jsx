import React from 'react'
import classNames from 'classnames'

export default function ButtonSecondary({ children, ...props }) {
  return (
    <button
      {...props}
      className={classNames(
        'mr-2 mb-2 rounded bg-green-600 bg-opacity-75 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
        props.className
      )}
    >
      {children}
    </button>
  )
}
