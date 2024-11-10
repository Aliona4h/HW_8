import axios from "axios";
import { createBrowserHistory } from "history";

const axiosInstance = axios.create({
  baseURL: "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/",
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
