import axiosInstance from "../utils/axiosInstance.js";

export const getUserArticles = async (username, type) => {
  const endpoint = `/articles?${type}=${username}`;
  const response = await axiosInstance.get(endpoint);
  return response.data.articles;
}

export const getArticle = async (slug) => {
  const response = await axiosInstance.get(`/articles/${slug}`);
  return response.data.article;
}

export const addToFavorites = async (slug) => {
  const response = await axiosInstance.post(`/articles/${slug}/favorite`);
  return response.data.article;
}

export const removeFromFavorites = async (slug) => {
  const response = await axiosInstance.delete(`/articles/${slug}/favorite`);
  return response.data.article;
}

export const deleteArticle = async (slug) => {
  const response = await axiosInstance.delete(`/articles/${slug}`);
  return response.data;
}
