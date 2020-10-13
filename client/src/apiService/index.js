import { responseErrorHandler, responseHandler } from "./interceptors";
import axios from "axios";

axios.interceptors.response.use(responseHandler, responseErrorHandler);

const httpService = {
  get: (url, params, customHeaders = {}, responseType = "json") => {
    return axios({ url, headers: { ...customHeaders }, params, responseType });
  },
  post: (url, data, responseType = "json", options) => {
    return axios.post(url, data, { responseType, ...options });
  },
  put: (url, data, options) => {
    return axios.put(url, data, options);
  },
  delete: (url) => {
    return axios.delete(url);
  },
};

export default httpService;
