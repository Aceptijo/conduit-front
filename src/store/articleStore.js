import {create} from 'zustand';

const useArticleStore = create((set) => ({
  title: '',
  description: '',
  body: '',
  tags: [],
  setTitle: (title) => set({title}),
  setDescription: (description) => set({description}),
  setBody: (body) => set({body}),
  addTag: (tag) => set((state) => ({
    tags: [...state.tags, tag]
  })),
  removeTag: (tagToRemove) => set((state) => ({
    tags: state.tags.filter((tag) => tag !== tagToRemove)
  })),
  resetForm: () => set({title: '', description: '', body: '', tags: []}),
}))

export default useArticleStore;