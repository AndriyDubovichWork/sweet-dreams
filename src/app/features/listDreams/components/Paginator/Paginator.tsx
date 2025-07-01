import React from 'react';
import style from './Paginator.module.scss';
import { usePaginatorStore } from '@/app/common/hooks/usePaginatorStore';

const Paginator = () => {
  const {
    pageNumber,
    pageSize,
    totalPages,
    canMoveForward,
    canMoveBackward,
    moveForward,
    moveBackward,
    offset,
  } = usePaginatorStore();

  return (
    <div className={style.paginator}>
      <button
        onClick={moveBackward}
        disabled={!canMoveBackward}
        className={style.navButton}
      >
        Previous
      </button>

      <span className={style.pageInfo}>
        Page {pageNumber} of {totalPages()}
        min {offset()} max {offset() + pageSize}
      </span>

      <button
        onClick={moveForward}
        disabled={!canMoveForward}
        className={style.navButton}
      >
        Next
      </button>
    </div>
  );
};
export default Paginator;
