import axiosInstance from "../utils/axiosInstance.js";

export const getTags = async () => {
  const response = await axiosInstance.get('/tags');
  const tags = response.data.tags;
  return tags.slice(0, 99);
}