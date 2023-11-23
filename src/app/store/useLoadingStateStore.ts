import { create } from 'zustand';

type Approve = string | null;

export type loadingStatus = 'pending' | 'fullfiled' | 'error';

export type loadingStateStore = {
  status: loadingStatus;
  setStatus: (status: loadingStatus) => void;
};

export const useLoadingStateStore = create<loadingStateStore>((set) => ({
  status: 'fullfiled',
  setStatus: (status) => set((state) => ({ ...state, status })),
}));
