import axiosInstance from "../utils/axiosInstance.js";

export const getUserArticles = async (username, type, offset, limit) => {
  const endpoint = `/articles?${type}=${username}&offset=${offset}&limit=${limit}`;
  const response = await axiosInstance.get(endpoint);
  return response.data;
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

export const getComments = async (slug) => {
  const response = await axiosInstance.get(`/articles/${slug}/comments`);
  return response.data.comments;
}

export const deleteComment = async (slug, commentId) => {
  await axiosInstance.delete(`/articles/${slug}/comments/${commentId}`);
}

export const addComment = async (slug, body) => {
  const response = await axiosInstance.post(`/articles/${slug}/comments`, {
    comment: {body},
  });
  return response.data.comment;
}
