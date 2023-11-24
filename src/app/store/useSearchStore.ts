import { create } from 'zustand';
import { SearchStore } from '../types/store/searchStore';

export const useSearchStore = create<SearchStore>((set) => ({
  search: '',
  setSearch: (search) => set((state) => ({ ...state, search })),
}));
