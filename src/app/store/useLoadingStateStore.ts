import { create } from 'zustand';
import { loadingStateStore } from '../features/dreams/types/store/loadingStateStore';

export const useLoadingStateStore = create<loadingStateStore>((set) => ({
  status: '',
  setStatus: (status) => set((state) => ({ ...state, status })),
  message: '',
  setMessage: (message) => set((state) => ({ ...state, message })),
}));
