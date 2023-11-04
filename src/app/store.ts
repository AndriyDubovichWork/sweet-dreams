import { create } from 'zustand';

type File = {
  id: string;
  name: string;
  size: number;
};

export type Store = {
  blob: Blob | null;
  setBlob: (blob: Blob | null) => void;
  name: string;
  setName: (name: string) => void;
  files: File[];

  setFiles: (files: File[]) => void;
};

export const useStore = create<Store>((set) => ({
  blob: null,
  setBlob: (blob) => set((state) => ({ ...state, blob })),
  name: '',
  setName: (name) => set((state) => ({ ...state, name })),
  files: [],
  setFiles: (files) => set((state) => ({ ...state, files })),
}));
