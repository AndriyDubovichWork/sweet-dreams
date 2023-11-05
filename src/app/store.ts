import { create } from 'zustand';

type File = {
  id: string;
  name: string;
  size: number;
};

type BlobT = Blob | null;

type Approve = string | null;

export type Store = {
  blob: BlobT;
  setBlob: (blob: BlobT) => void;

  name: string;
  setName: (name: string) => void;

  files: File[];
  setFiles: (files: File[]) => void;

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

export const useStore = create<Store>((set) => ({
  blob: null,
  setBlob: (blob) => set((state) => ({ ...state, blob })),

  name: '',
  setName: (name) => set((state) => ({ ...state, name })),

  files: [],
  setFiles: (files) => set((state) => ({ ...state, files })),

  approve: null,
  approveCallback: () => {},
  setApprove: ({ approve, approveCallback }) =>
    set((state) => ({ ...state, approve, approveCallback })),
}));