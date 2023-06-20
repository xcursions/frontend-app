import axios from "axios";
import Cookies from "js-cookie";

const baseAxiosMethod = axios.create({});

baseAxiosMethod.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("xcursions-token");
    if (token && config.headers) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default baseAxiosMethod;
