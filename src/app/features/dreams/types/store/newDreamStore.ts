type BlobT = Blob | null;

export type NewDreamStore = {
  blob: BlobT;
  setBlob: (blob: BlobT) => void;

  name: string;
  setName: (name: string) => void;

  date: string;
  setDate: (date: string) => void;

  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
};
