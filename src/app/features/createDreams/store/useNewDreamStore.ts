import { create } from 'zustand';
import { NewDreamStore } from '../../../common/store/types/newDreamStore';

export const useNewDreamStore = create<NewDreamStore>((set) => ({
  blob: null,
  setBlob: (blob) => set((state) => ({ ...state, blob })),

  name: '',
  setName: (name) => set((state) => ({ ...state, name })),

  date: new Date().toLocaleDateString('en-US'),
  setDate: (date) => set((state) => ({ ...state, date })),

  isPrivate: false,
  setIsPrivate: (isPrivate) => set((state) => ({ ...state, isPrivate })),
}));
