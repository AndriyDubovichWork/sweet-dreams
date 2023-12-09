import { create } from 'zustand';
import { DeleteFileStore } from '../../types/store/deleteFileStore';

export const useDeleteFileStore = create<DeleteFileStore>((set) => ({
  deletingFileName: '',
  setDeletingFileName: (name) =>
    set((state) => ({ ...state, deletingFileName: name })),

  localName: '',
  setLocalName: (localName) => set((state) => ({ ...state, localName })),
}));
