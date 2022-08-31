import classNames from "classnames";
import React, { PropsWithChildren } from "react";

export default function ButtonSecondary({ children, ...props }) {
  return (
    <button
      {...props}
      className={classNames(
        "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
        props.className
      )}
    >
      {children}
    </button>
  );
}
