import {
  BASE_URL,
  Timeout
} from '../const';
import
axios,
{
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const options: {
  baseURL: string;
  timeout: number;
} = {
  baseURL: BASE_URL,
  timeout: Timeout.Connect,
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
    if (error.response && shouldDisplayError(error.response)) {
      error.response.data
        ? toast.warn(error.response.data.error)
        : toast.error(error.response.statusText);
    }


    return Promise.reject(error);
  }
);

export default api;

