import React from "react";
import { useQuery } from "react-query";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { useCandProfile } from "../../hooks/useProfile";
import AuthLayout from "../Layout/Auth";

export const Jobs = () => {
  const API = useAxiosPrivate();

  //Custom hook to check if user profile exist
  const { data: profile } = useCandProfile();
  //State to check if profile exist
  const isEnabled = profile !== undefined || null ? true : false;

  // React query to fetch Jobs
  const { isLoading, data } = useQuery(
    "applications",
    async () => {
      const res = await API.get(`/v1/application/?cand_id=${profile?.id}`);
      return res.data;
    },
    {
      refetchOnWindowFocus: false,
      retry: 2,
      enabled: isEnabled, //Disable query if Profile is null / undefined
    }
  );

  if (isLoading) return <h1> Loading</h1>;

  console.log("fetched applications", data);

  return (
    <AuthLayout title="Jobs that you applied">
      <div>
        Jobs
        {
            data && data.map((job) => (
                <div key={job.id}>
                    <h1>{job.title}</h1>
                    <h1>Hello job</h1> 
                </div>
            ))
        }
      </div>
    </AuthLayout>
  );
};
