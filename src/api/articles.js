import axiosInstance from "../utils/axiosInstance.js";

export const getUserArticles = async (username, type) => {
   const endpoint = `/articles?${type}=${username}`;
   const response = await axiosInstance.get(endpoint);
   return response.data.articles;
}