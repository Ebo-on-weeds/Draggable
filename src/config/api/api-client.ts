import axios, { type AxiosRequestConfig } from 'axios';
import BASE_URL from './api-url';

const BASE_CONFIG: AxiosRequestConfig = {
  url: BASE_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': '*/*',
  },
};

axios.defaults.withCredentials = true;

const API_CLIENT = axios.create(BASE_CONFIG);

API_CLIENT.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API_CLIENT.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API_CLIENT;
