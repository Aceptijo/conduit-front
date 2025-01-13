import axiosInstance from "../utils/axiosInstance.js";

export const getUserProfile = async (username) => {
   const response = await axiosInstance.get(`/profiles/${username}`);
   return response.data.profile;
}