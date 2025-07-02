export type PaginatorStore = {
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: () => number;
  canMoveForward: () => boolean;
  canMoveBackward: () => boolean;
  offset: () => number;
  visiblePages: () => number[];
  setPage: (page: number) => void;
  moveForward: () => void;
  moveBackward: () => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  goToFirst: () => void;
  goToLast: () => void;
};
