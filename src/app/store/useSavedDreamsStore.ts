import { create } from 'zustand';

export type File = {
  id: string;
  name: string;
  size: number;
  webContentLink: string;
  processing?: boolean;
};

export type SavedDreamsStore = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export const useSavedDreamsStore = create<SavedDreamsStore>((set) => ({
  files: [],
  setFiles: (files) =>
    set((state) => ({
      ...state,
      files,
    })),
}));
