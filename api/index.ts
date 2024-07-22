import { API_URL, TOKEN } from "@/constants/ApiConst";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

export interface ErrorResponse {
  statusCode: number;
  status: boolean;
  data: any;
}
const createHttpClient = () => {
  const client: AxiosInstance = axios.create({
    baseURL: API_URL, // Replace with your API base URL
    timeout: 5000, // Set a timeout value if needed
  });

  const onRequest = async (request: AxiosRequestConfig): Promise<any> => {
    request.headers!.Authorization = `Bearer ${TOKEN}`; // Add the token to the Authorization header
    return request;
  };

  const onResponse = (response: AxiosResponse): any => {
    return {
      statusCode: response.status,
      data: response.data,
      headers: response.headers,
    };
  };
  const onError = async (error: AxiosError | any) => {
    if (error.response) {
      throw {
        statusCode: error.response?.status ?? "",
        status: false,
        data: error.response?.data ?? "",
      };
    } else {
      throw error;
    }
  };
  client.interceptors.request.use(onRequest);
  client.interceptors.response.use(onResponse, onError);
  return client;
};
export const api = createHttpClient();
