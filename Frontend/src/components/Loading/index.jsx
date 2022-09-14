import React from "react";

export const Loading = () => {
  return (
    <div className="border-none rounded-md p-4  w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 dark:bg-slate-100 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 dark:bg-slate-100 rounded col-span-1"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div className="h-2 bg-slate-700 dark:bg-slate-100 rounded-full "></div>
            <div className="h-2 bg-slate-700 dark:bg-slate-100 rounded-full w-24"></div>
            <div className="h-2 bg-slate-700 dark:bg-slate-100 rounded-full w-full"></div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 dark:bg-slate-100 rounded col-span-1"></div>
              <div className="h-2 bg-slate-700 dark:bg-slate-100 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

