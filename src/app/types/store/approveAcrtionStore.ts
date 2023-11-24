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
