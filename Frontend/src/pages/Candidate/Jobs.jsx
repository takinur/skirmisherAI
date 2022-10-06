import React from "react";
import { useQuery } from "react-query";
import { Applied } from "../../components/Card/applied";
import { Loading } from "../../components/Loading";
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
      <div className="flex flex-col">
        <h2 className="mb-4 text-center text-2xl font-bold">Applied Jobs</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Applied />
          <Applied />
          <Applied />
          <Applied />
          <Loading />
          <Loading />
        </div>
      </div>
    </AuthLayout>
  );
};
