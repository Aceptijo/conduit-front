import { create } from 'zustand';
import { followUser, getUserProfile, unfollowUser } from '../api/user.js';

const useProfileStore = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  fetchProfile: async (username) => {
    set({ isLoading: true });
    try {
      const response = await getUserProfile(username);
      set({ profile: response });
    } catch (err) {
      set({ error: err });
      console.error('Не получилось получить данные профиля: ', err);
    } finally {
      set({ isLoading: false });
    }
  },
  setProfile: (user) => {
    set({ profile: user });
  },
  followUser: async (username) => {
    try {
      const response = await followUser(username);
      set({ profile: response });
    } catch (err) {
      set({ error: err.response.data.errors.body });
      console.error('Не удалось подписаться: ', err);
    }
  },
  unfollowUser: async (username) => {
    try {
      const response = await unfollowUser(username);
      set({ profile: response });
    } catch (err) {
      set({ error: err.response.data.errors.body });
      console.error('Не удалось отписаться: ', err);
    }
  },
}));

export default useProfileStore;
