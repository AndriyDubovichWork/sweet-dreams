import { create } from 'zustand';

type Approve = string | null;

export type ApproveAcrtionStore = {
  approve: Approve;
  approveCallback: () => void;
  setApprove: ({
    approve,
    approveCallback,
  }: {
    approve: Approve;
    approveCallback: () => void;
  }) => void;
};

export const useApproveAcrtionStore = create<ApproveAcrtionStore>((set) => ({
  approve: null,
  approveCallback: () => {},
  setApprove: ({ approve, approveCallback }) =>
    set((state) => ({ ...state, approve, approveCallback })),
}));
