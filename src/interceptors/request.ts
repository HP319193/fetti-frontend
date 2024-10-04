// api.ts (or wherever you create the axios instance)
import axios, { AxiosRequestConfig } from "axios";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
const api = axios.create({
  baseURL: apiServerUrl,
});

const setAuthInterceptor = (accessToken: string) => {
  api.interceptors.request.use((config: any) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });
};

export { api, setAuthInterceptor };
