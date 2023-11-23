import { create } from 'zustand';

export type File = {
  id: string;
  name: string;
  size: number;
  webContentLink: string;
  createdTime: string;
  processing?: boolean;
};
export type OrderByValues = 'createdTime' | 'name' | 'modifiedTime';
export type OrderByNames = 'created time' | 'name' | 'modified time';

export type SortBy = {
  value: OrderByValues;
  name: OrderByNames;
};

export type SavedDreamsStore = {
  files: File[];
  setFiles: (files: File[]) => void;

  sortBy: SortBy[];
  sortById: number;
  setSortById: (sortById: number) => void;

  isSortByReversed: boolean;
  setIsSortByReversed: (isSortByReversed: boolean) => void;
};
const sortBy: SortBy[] = [
  {
    name: 'name',
    value: 'name',
  },
  {
    name: 'modified time',
    value: 'modifiedTime',
  },
  {
    name: 'created time',
    value: 'createdTime',
  },
];

export const useSavedDreamsStore = create<SavedDreamsStore>((set) => ({
  files: [],
  setFiles: (files) =>
    set((state) => ({
      ...state,
      files,
    })),

  sortBy,

  sortById: 1,
  setSortById: (sortById) =>
    set((state) => ({
      ...state,
      sortById,
    })),

  isSortByReversed: true,
  setIsSortByReversed: (isSortByReversed) =>
    set((state) => ({
      ...state,
      isSortByReversed,
    })),
}));
