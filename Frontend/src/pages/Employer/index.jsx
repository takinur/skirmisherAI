import React, { useState, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";

export const EmployerDashboard = () => {
  const API = useAxios();
  const [userDetails, setUserDetails] = useState({});

  const getUserInfo = async () => {
    const response = await API.get("account/employer/",{params:id} );
    if (response.status === 200) {
      setUserDetails(response.data);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  console.log("From dashindex", userDetails);

  return (
    <div className="h-full">
      check if user info is present
      {userDetails ? <p>{userDetails.phone}</p> : <p>no user info</p>}
    </div>
  );
};
