import { create } from 'zustand';

const useThemeStore = create((set) => ({
  themeMode: 'dark',
  setThemeMode: () => {
    set((state) => ({
      themeMode: state.themeMode === 'dark' ? 'light' : 'dark',
    }));
  },
}));

export default useThemeStore;
