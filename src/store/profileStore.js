import {create} from 'zustand';

const useProfileStore = create((set) => ({
   profile: null,
   article: [],
   isLoading: false,

}))