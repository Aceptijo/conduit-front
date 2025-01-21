import {create} from 'zustand';
import {followUser, getUserProfile, unfollowUser} from "../api/user.js";
import {getUserArticles} from "../api/articles.js";

const useProfileStore = create((set) => ({
  profile: null,
  articles: [],
  articlesCount: 0,
  isLoading: false,
  fetchProfile: async (username) => {
    set({isLoading: true});
    try {
      const response = await getUserProfile(username);
      set({profile: response})
    } catch (err) {
      console.error('Не получилось получить данные профиля: ', err);
    } finally {
      set({isLoading: false})
    }
  },
  setProfile: (user) => {
    set({profile: user})
  },
  fetchArticles: async (username, type, offset, limit) => {
    set({isLoading: true});
    try {
      const response = await getUserArticles(username, type, offset, limit);
      set({
        articles: response.articles,
        articlesCount: response.articlesCount,
        isLoading: false,
      })
    } catch (err) {
      console.error('Не получилось получить данные статей: ', err);
    } finally {
      set({isLoading: false})
    }
  },
  followUser: async (username) => {
    try {
      const response = await followUser(username);
      set({profile: response})
    } catch (err) {
      console.error('Не удалось подписаться: ', err)
    }
  },
  unfollowUser: async (username) => {
    try {
      const response = await unfollowUser(username);
      set({profile: response})
    } catch (err) {
      console.error('Не удалось отписаться: ', err);
    }
  }
}))

export default useProfileStore;