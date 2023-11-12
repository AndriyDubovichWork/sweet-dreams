import { create } from 'zustand';

export type File = {
  id: string;
  name: string;
  size: number;
  webContentLink: string;
  deleting?: boolean;
  editable: boolean;
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
  setEditable: (id: number, isEditable: boolean, files: File[]) => void;

  approve: Approve;
  approveCallback: () => void;
  setApprove: ({
    approve,
    approveCallback,
  }: {
    approve: Approve;
    approveCallback: () => void;
  }) => void;

  date: string;
  setDate: (date: string) => void;
};

export const useStore = create<Store>((set) => ({
  blob: null,
  setBlob: (blob) => set((state) => ({ ...state, blob })),

  name: '',
  setName: (name) => set((state) => ({ ...state, name })),

  files: [],
  setFiles: (files) =>
    set((state) => {
      return {
        ...state,
        files: files.map((file) => {
          return { ...file, editable: false };
        }),
      };
    }),
  setEditable: (id, isEditable, files) =>
    set((state) => {
      return {
        ...state,
        files: files.map((file, idx) => {
          return { ...file, editable: idx === id ? isEditable : file.editable };
        }),
      };
    }),

  approve: null,
  approveCallback: () => {},
  setApprove: ({ approve, approveCallback }) =>
    set((state) => ({ ...state, approve, approveCallback })),

  date: new Date().toLocaleDateString('en-GB'),
  setDate: (date) => set((state) => ({ ...state, date })),
}));
