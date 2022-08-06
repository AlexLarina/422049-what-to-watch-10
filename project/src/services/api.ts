import { BASE_URL, CONNECT_TIMEOUT } from '../const';
import axios, {AxiosInstance} from 'axios';

const options: {
  baseURL: string;
  timeout: number;
} = {
  baseURL: BASE_URL,
  timeout: CONNECT_TIMEOUT,
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create(options);

  api.interceptors.response.use(
    (response) => response,
    (error) => { throw new Error(error.response.data.error); }
  );

  return api;
};

