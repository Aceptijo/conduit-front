import { create } from 'zustand';

const useThemeStore = create((set) => ({
  themeMode: localStorage.getItem('globalTheme') || 'dark',
  setThemeMode: () => {
    document.startViewTransition(() => {
      set((state) => {
        const newThemeMode = state.themeMode === 'dark' ? 'light' : 'dark';
        localStorage.setItem('globalTheme', newThemeMode);
        return { themeMode: newThemeMode };
      });
    });
  },
}));

export default useThemeStore;
