import axios from "axios";

export const axiosInstanceUserManagement = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosInstanceCartManagement = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosInstanceProduct = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
