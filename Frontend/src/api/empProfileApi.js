import { useAxios } from "../hooks/useAxios";

export const getEmpProfile = async (id) => {
  const API = useAxios(); //Axios instance with baseURL and headers
  const response = await API.get(`/account/employer/${id}`);
  // console.log(response.data);

  return response.data;
};

export const updateEmpProfile = async ({ id, data }) => {
  const response = await API.put(`/empProfile/${id}`, data);
  return response.data;
};
