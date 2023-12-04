import { create } from 'zustand';
import { loadingStateStore } from '../../../types/store/loadingStateStore';

export const useLoadingStateStore = create<loadingStateStore>((set) => ({
  status: '',
  setStatus: (status) => set((state) => ({ ...state, status })),
}));
