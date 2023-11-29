import { create } from 'zustand';
import { loadingStateStore } from '../../../types/store/loadingStateStore';
import { loadingStatus } from '@/app/enums/loadingStatus';

export const useLoadingStateStore = create<loadingStateStore>((set) => ({
  status: loadingStatus.fullfiled,
  setStatus: (status) => set((state) => ({ ...state, status })),
}));
