import { DeleteFileStore } from '@/app/types/store/deleteFileStore';
import { create } from 'zustand';

export const useDeleteFileStore = create<DeleteFileStore>((set) => ({
  deletingFileName: '',
  setDeletingFileName: (name) =>
    set((state) => ({ ...state, deletingFileName: name })),

  localName: '',
  setLocalName: (localName) => set((state) => ({ ...state, localName })),
}));
