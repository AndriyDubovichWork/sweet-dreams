import { create } from 'zustand';

type BlobT = Blob | null;

export type SearchStore = {
  search: string;
  setSearch: (search: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  search: '',
  setSearch: (search) => set((state) => ({ ...state, search })),
}));
