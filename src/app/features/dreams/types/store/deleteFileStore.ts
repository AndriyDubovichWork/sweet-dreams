export type DeleteFileStore = {
  deletingFileName: string | null;
  setDeletingFileName: (name: string | null) => void;
  localName: string;
  setLocalName: (name: string) => void;
};
