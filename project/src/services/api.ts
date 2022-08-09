import { BASE_URL, CONNECT_TIMEOUT } from '../const';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import { getToken } from './token';

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

    // eslint-disable-next-line no-console
    console.log(token);

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => { throw new Error(error.response.data.error); }
);

export default api;

