import axios from "axios";
import { createBrowserHistory } from "history";

const baseUrl = process.env.REACT_APP_BASE_URL;
console.log("Base URL:", process.env.REACT_APP_BASE_URL);

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const history = createBrowserHistory();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    if (status === 401 || status === 403) {
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
