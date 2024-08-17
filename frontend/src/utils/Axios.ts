import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": import.meta.env.VITE_BASE_URL as string,
};
const fileHeaders = {
  "Content-Type": "multipart/form-data",
};
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export const axiosPrivate = axios.create({ headers });
export const axiosPrivateFile = axios.create({ headers: fileHeaders });
export const axiosPublicFile = axios.create({ headers: fileHeaders });
export default axios.create({ headers });