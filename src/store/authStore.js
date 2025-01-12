import {create} from 'zustand'

const useAuthStore = create((set) => ({
   user: null,
   token: null,
   isLoading: true,
   setUser: (user, token) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user))
      set({user, token, isLoading: false})
   },
   clearUser: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({user: null, token: null, isLoading: false});
   },
   restoreSession: () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && token) {
         set({user, token, isLoading: false})
      } else {
         set({user: null, token: null, isLoading: false})
      }
   }
}))

export default useAuthStore;