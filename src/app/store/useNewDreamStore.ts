import { create } from 'zustand';

type BlobT = Blob | null;

export type NewDreamStore = {
  blob: BlobT;
  setBlob: (blob: BlobT) => void;

  name: string;
  setName: (name: string) => void;

  date: string;
  setDate: (date: string) => void;
};

export const useNewDreamStore = create<NewDreamStore>((set) => ({
  blob: null,
  setBlob: (blob) => set((state) => ({ ...state, blob })),

  name: '',
  setName: (name) => set((state) => ({ ...state, name })),

  date: new Date().toLocaleDateString('en-US'),
  setDate: (date) => set((state) => ({ ...state, date })),
}));
