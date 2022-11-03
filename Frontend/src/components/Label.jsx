import React from 'react'

export default function Label({ value, htmlFor, children }) {
  return (
    <label className="block text-sm font-medium text-gray-500 dark:text-gray-200" htmlFor={htmlFor}>
      {value || children}
    </label>
  )
}
