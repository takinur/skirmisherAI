import { useAxios } from "../src/hooks/useAxios";

const API = useAxios();

export const getEmpProfile = async ({ id }) => {
  const response = await API.get(`/empProfile/${id}`);
  return response.data;
};

export const updateEmpProfile = async ({ id, data }) => {
  const response = await API.put(`/empProfile/${id}`, data);
  return response.data;
};
