import { create } from 'zustand';
import { getArticlesByTag, getGlobalArticles, getUserArticles } from '../api/articles.js';

const useArticlesStore = create((set) => ({
  articles: [],
  articlesCount: 0,
  isLoading: false,
  totalPages: 1,
  setArticles: (articles) => set({ articles }),
  fetchArticles: async (username, type, offset, limit) => {
    set({ isLoading: true });
    try {
      const response = await getUserArticles(username, type, offset, limit);
      set({
        articles: response.articles,
        articlesCount: response.articlesCount,
        isLoading: false,
      });
    } catch (err) {
      console.error('Не получилось загрузить данные статей: ', err);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchGlobalArticles: async (type, limit, offset) => {
    set({ isLoading: true });
    set({ articles: [] });
    try {
      const response = await getGlobalArticles(type, limit, offset);
      console.log(response);
      set({
        articles: response.articles,
        articlesCount: response.articlesCount,
        totalPages: Math.ceil(response.articlesCount / limit),
        isLoading: false,
      });
    } catch (err) {
      console.error('Не получилось загрузить статьи: ', err);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchArticlesByTag: async (selectedTag, limit, offset) => {
    set({ isLoading: true });
    set({ articles: [] });
    try {
      const response = await getArticlesByTag(selectedTag, limit, offset);
      set({
        articles: response.articles,
        articlesCount: response.articlesCount,
        totalPages: Math.ceil(response.articlesCount / limit),
        isLoading: false,
      });
    } catch (err) {
      console.error('Не получилось отсортировать статьи: ', err);
    } finally {
      set({ isLoading: false });
    }
  },
  favoriteToggle: (updatedArticle) =>
    set((state) => ({
      articles: state.articles.map((article) =>
        article.slug === updatedArticle.slug ? updatedArticle : article
      ),
    })),
}));

export default useArticlesStore;
