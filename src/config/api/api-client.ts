import axios, { type AxiosRequestConfig } from 'axios';
import BASE_URL from './api-url';

const BASE_CONFIG: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
};

//for using with JWT token and cookies , e.g refresh token that is httpOnly
axios.defaults.withCredentials = true;

const API_CLIENT = axios.create(BASE_CONFIG);

// will be used for intercepting requests for adding tokens or logging and security handling
API_CLIENT.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// will be used for intercepting responses for logging and security handling
API_CLIENT.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API_CLIENT;
