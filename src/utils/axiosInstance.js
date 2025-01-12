import axios from "axios";
import useAuthStore from "../store/authStore.js";


const API_URL = "https://conduit-realworld-example-app.fly.dev/api";

const axiosInstance = axios.create({
   baseURL: API_URL,
})

axiosInstance.interceptors.request.use((config) => {
   const token = useAuthStore.getState().token;
   if (token) {
      config.headers.Authorization = `Token ${token}`;
   }
   return config;
})

export default axiosInstance;