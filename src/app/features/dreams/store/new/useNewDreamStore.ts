import { create } from 'zustand';
import { NewDreamStore } from '../../types/store/newDreamStore';

export const useNewDreamStore = create<NewDreamStore>((set) => ({
  blob: null,
  setBlob: (blob) => set((state) => ({ ...state, blob })),

  name: '',
  setName: (name) => set((state) => ({ ...state, name })),

  date: new Date().toLocaleDateString('en-US'),
  setDate: (date) => set((state) => ({ ...state, date })),
}));
