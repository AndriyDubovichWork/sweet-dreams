type Approve = string | null;
type ApproveType = 'deletion' | 'rename' | null;

export type ApproveActionStore = {
  type: ApproveType;
  approve: Approve;
  approveCallback: () => void;
  setApprove: ({
    approve,
    type,
    approveCallback,
  }: {
    approve: Approve;
    type: ApproveType;
    approveCallback: () => void;
  }) => void;
  resetApprove: () => void;
};
