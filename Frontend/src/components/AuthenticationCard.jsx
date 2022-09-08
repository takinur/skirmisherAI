import React from 'react';

export default function AuthenticationCard({
  children,
}) {
  return (
    <div className="md:min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <div>
        LOGO
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
