// 封装axios
//实例化，请求拦截器  响应拦截器
import axios from "axios";
import { getToken } from "./token";
import history from "./history";
const http = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/2558741-0-default",
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

export { http };
