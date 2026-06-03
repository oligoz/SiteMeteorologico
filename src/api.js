import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (import.meta.env.VITE_API_KEY) {
      config.params = {
        ...config.params,
        key: import.meta.env.VITE_API_KEY,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
