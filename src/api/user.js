import axiosInstance from "../utils/axiosInstance.js";

export const getUserProfile = async (username) => {
   const response = await axiosInstance.get(`/profiles/${username}`);
   return response.data.profile;
}

export const followUser = async (username) => {
   const response = await axiosInstance.post(`/profiles/${username}/follow`);
   return response.data.profile;
}

export const unfollowUser = async (username) => {
   const response = await axiosInstance.delete(`/profiles/${username}/follow`);
   return response.data.profile;
}