import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';
import { BASE_URL } from '../config';

const baseURL = BASE_URL

const instance = axios.create({
  baseURL,
  // headers: { 'Content-Type': '' }
  // headers: { 'Content-Type': 'application/json' }
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    console.log('messageError', error.message);
    return Promise.reject(error);
  },
);

instance.interceptors.request.use(
  (config) => {
    // console.log(config)
    // // const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth') || '') : null;
    // if (auth?.accessToken && auth?.refreshToken) {
    //   config.headers['Authorization'] = 'Bearer ' + auth.accessToken;
    //   config.headers['RefreshToken'] = 'Bearer ' + auth.refreshToken;
    // }
    return config;
  },
  (error) => {
    console.log(" error ne : ", error);
    return Promise.reject(error);
  }
);

export default instance;

