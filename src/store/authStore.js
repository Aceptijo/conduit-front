import {create} from 'zustand'
import {combine, persist} from "zustand/middleware";

const useAuthStore = create(persist(combine(
   {isAuth: false, user: null}, (set) => ({
      setUser: (userData) => set({
         isAuth: true,
         user: userData,
      }),
      logout: () => set({
         isAuth: false,
         user: null
      })
   })
), {name: 'auth-storage'}))

export default useAuthStore;