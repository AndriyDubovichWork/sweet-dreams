import { create } from 'zustand';
import { ApproveAcrtionStore } from '../../types/store/approveAcrtionStore';

export const useApproveAcrtionStore = create<ApproveAcrtionStore>((set) => ({
  approve: null,
  approveCallback: () => {},
  setApprove: ({ approve, approveCallback }) =>
    set((state) => ({ ...state, approve, approveCallback })),
}));
