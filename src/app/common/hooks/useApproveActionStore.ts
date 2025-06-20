import { create } from 'zustand';
import { ApproveActionStore } from '../store/types/approveActionStore';

export const useApproveActionStore = create<ApproveActionStore>((set) => ({
  type: null,
  approve: null,
  approveCallback: () => {},
  setApprove: ({ approve, type, approveCallback }) =>
    set((state) => ({ ...state, approve, type, approveCallback })),
  resetApprove: () =>
    set((state) => ({
      ...state,
      approve: null,
      type: null,
      approveCallback: () => {},
    })),
}));
