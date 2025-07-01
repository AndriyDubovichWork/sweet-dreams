import { create } from 'zustand';
import { PaginatorStore } from '../store/types/paginatorStore';

export const usePaginatorStore = create<PaginatorStore>((set, get) => ({
  // Initial state
  pageNumber: 1,
  pageSize: 10,
  totalItems: 100,

  // Computed values
  totalPages: () => Math.max(1, Math.ceil(get().totalItems / get().pageSize)),
  canMoveForward: () => get().pageNumber < get().totalPages(),
  canMoveBackward: () => get().pageNumber > 1,
  offset: () => (get().pageNumber - 1) * get().pageSize,

  getMinNumber: () => get().pageNumber * get().pageSize,
  getMaxNumber: () => {
    const min = get().pageNumber * get().pageSize;
    return min + get().pageSize;
  },

  // Actions
  setPage: (page) =>
    set({
      pageNumber: Math.max(1, Math.min(page, get().totalPages())),
    }),

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
      pageNumber: 1, // Reset to first page
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
