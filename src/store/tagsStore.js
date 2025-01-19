import {create} from 'zustand';
import {getTags} from "../api/tags.js";

const useTagsStore = create((set) => ({
  tags: [],
  isLoadingTags: false,
  fetchTags: async () => {
    set({isLoading: true});
    try {
      const response = await getTags();
      set({tags: response});
    } catch (err) {
      console.error('Не удалось загрузить тэги: ', err);
    } finally {
      set({isLoading: false});
    }
  }
}))

export default useTagsStore;