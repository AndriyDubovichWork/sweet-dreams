import { create } from 'zustand';
import { PaginatorStore } from '../store/types/paginatorStore';

export const usePaginatorStore = create<PaginatorStore>((set, get) => ({
  pageNumber: 1,
  pageSize: 10,
  totalItems: 100,

  // Total pages calculation (unchanged)
  totalPages: () => Math.max(1, Math.ceil(get().totalItems / get().pageSize)),

  // Navigation checks (unchanged)
  canMoveForward: () => get().pageNumber < get().totalPages(),
  canMoveBackward: () => get().pageNumber > 1,

  // This is what makes it 0-9, 10-19, etc.
  offset: () => (get().pageNumber - 1) * get().pageSize,

  // Google-style page numbers display
  visiblePages: () => {
    const current = get().pageNumber;
    const total = get().totalPages();
    const visiblePages = [];

    // Always show first page
    visiblePages.push(1);

    // Show ellipsis if needed
    if (current > 3) visiblePages.push(-1); // -1 represents ellipsis

    // Show pages around current
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < total) visiblePages.push(i);
    }

    // Show ellipsis if needed
    if (current < total - 2) visiblePages.push(-1);

    // Always show last page if different from first
    if (total > 1) visiblePages.push(total);

    return visiblePages;
  },

  // Rest of the store implementation remains the same...
  setPage: (page) => {
    const validPage = Math.max(1, Math.min(page, get().totalPages()));
    if (validPage !== get().pageNumber) {
      set({ pageNumber: validPage });
    }
  },

  moveForward: () =>
    set((state) => {
      const totalPages = Math.ceil(state.totalItems / state.pageSize);
      return {
        pageNumber: Math.min(state.pageNumber + 1, totalPages),
      };
    }),

  moveBackward: () =>
    set((state) => ({
      pageNumber: Math.max(state.pageNumber - 1, 1),
    })),

  setPageSize: (size) =>
    set({
      pageSize: Math.max(1, size),
      pageNumber: 1,
    }),

  setTotalItems: (total) =>
    set({
      totalItems: Math.max(0, total),
      pageNumber: Math.min(
        get().pageNumber,
        Math.ceil(total / get().pageSize) || 1
      ),
    }),

  goToFirst: () => set({ pageNumber: 1 }),

  goToLast: () =>
    set((state) => ({
      pageNumber: state.totalPages(),
    })),
}));
