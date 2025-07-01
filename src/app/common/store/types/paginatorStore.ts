export type PaginatorStore = {
  // State
  pageNumber: number;
  pageSize: number;
  totalItems: number;

  // Computed properties
  totalPages: () => number;
  canMoveForward: () => boolean;
  canMoveBackward: () => boolean;
  offset: () => number; // Useful for API calls (pageNumber * pageSize)

  getMinNumber: () => number;
  getMaxNumber: () => number;

  // Actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  moveForward: () => void;
  moveBackward: () => void;
  goToFirst: () => void;
  goToLast: () => void;
};
