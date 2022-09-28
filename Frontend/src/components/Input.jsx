import classNames from "classnames";
import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      "border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ",
      props.className
    )}
  />
));

export default Input;
