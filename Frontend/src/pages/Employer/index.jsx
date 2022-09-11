import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAxios } from "../../hooks/useAxios";
import { getEmpProfile } from "../../api/empProfileApi";

export const EmployerDashboard = () => {
  const API = useAxios();
  const [userProfile, setUserProfile] = useState("");
  const id = 188 ; //Hardcoded for now
  // const { isLoading, isError, error, data : empProfile } = useQuery('empProfile', 
  // async() => {
  //   return await API.get(`/account/employer/${id}`);
  // },{
  //   enabled:false,
  //   retry: 1,
  //   onSuccess : (res) => {
  //     const result = {
  //       status: res.status + '-' + res.statusText,
  //       headers: res.headers,
  //       data: res.data,
  //     };
  //     setUserProfile(formatResponse(result))
  //   },
  //   onError :(err) => {
  //     setUserProfile(formatResponse(err.response?.data || err))
  //   }
  // });



  // if(isLoading) return <div>Loading...</div>
  // if(isError) return <div>Error: {error.message}</div>
  // console.log(userProfile , 'USer Profile')

  // console.log('data',empProfile);

  const getUserInfo = async () => {
    const response = await API.get(`/account/employer/${id}`);
    if (response.status === 200) {
      setUserProfile(response.data);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  console.log("From dashindex", userProfile);

  return (
    <div className="h-full">
      <h2>
        Hi, i am from dashboard index page. 
      </h2>
    </div>
  );
};
