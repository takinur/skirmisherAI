import React from 'react';

export default function Label({
  value,
  htmlFor,
  children,
}) {
  return (
    <label
      className="block font-medium text-sm text-gray-700"
      htmlFor={htmlFor}
    >
      {value || children}
    </label>
  );
}
