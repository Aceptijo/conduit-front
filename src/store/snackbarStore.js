import { create } from 'zustand';

const useSnackbarStore = create((set) => ({
  open: false,
  message: '',
  severity: 'success',
  showSnackbar: (text, type = 'success') => {
    set({ open: true, message: text, severity: type });
  },
  closeSnackbar: () => {
    set({ open: false });
  },
}));

export default useSnackbarStore;
