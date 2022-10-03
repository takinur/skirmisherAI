import React from "react";
import { useQuery } from "react-query";

import { axiosInstance as API } from "../api/axiosInstance";

export const useGetJobs = (filters) => {
  return useQuery(
    // Fetch jobs and filter them
    ["jobs"],
    async () => {
      const res = await API.get(`jobs-public/`);
      return res.data;
    },
    {
      select: (jobs) =>
        jobs.filter((job) => job.title.includes(filters.title)),
    }
  );
};
