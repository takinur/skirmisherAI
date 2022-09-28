import classNames from "classnames";
import React, { forwardRef } from "react";

const TextArea = forwardRef((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    className={classNames(
      "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
      props.className
    )}
  />
));

export default TextArea;
