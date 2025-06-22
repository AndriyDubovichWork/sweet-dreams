export type File = {
  id: string;
  name: string;
  size: number;
  webContentLink: string;
  playableurl: string;
  createdTime: string;
  processing?: boolean;
};
export type OrderByValues = 'createdTime' | 'name' | 'modifiedTime';
export type OrderByNames = 'created time' | 'name' | 'modified time';

export type SortBy = {
  value: OrderByValues;
  name: OrderByNames;
};

export type SavedDreamsStore = {
  files: File[];
  setFiles: (files: File[]) => void;

  sortBy: SortBy[];
  sortById: number;
  setSortById: (sortById: number) => void;

  isSortByReversed: boolean;
  setIsSortByReversed: (isSortByReversed: boolean) => void;
};
