import { BASE_URL, CONNECT_TIMEOUT } from '../const';
import axios, {AxiosInstance} from 'axios';

const options: {
  baseURL: string;
  timeout: number;
} = {
  baseURL: BASE_URL,
  timeout: CONNECT_TIMEOUT,
};

export const createAPI = (): AxiosInstance => axios.create(options);
