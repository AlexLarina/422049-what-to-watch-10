import {
  BASE_URL,
  CONNECT_TIMEOUT
} from '../const';
import
axios,
{
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig
} from 'axios';

import { getToken } from './token';
import { toast } from 'react-toastify';

const options: {
  baseURL: string;
  timeout: number;
} = {
  baseURL: BASE_URL,
  timeout: CONNECT_TIMEOUT,
};

const createAPI = (): AxiosInstance => axios.create(options);
const api = createAPI();

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  },
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      toast.warn(error.response.data.error);
    }

    return Promise.reject(error);
  }
);

export default api;

