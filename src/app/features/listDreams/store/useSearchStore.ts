import { create } from 'zustand';
import { SearchStore } from '../../../common/store/types/searchStore';

export const useSearchStore = create<SearchStore>((set) => ({
  search: '',
  setSearch: (search) => set((state) => ({ ...state, search })),
}));
