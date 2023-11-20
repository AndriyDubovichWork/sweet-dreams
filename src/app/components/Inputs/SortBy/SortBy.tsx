import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import React from 'react';
import Button from '../Button/Button';
import useUpdateDreams from '@/app/hooks/useUpdateDreams';

export default function SortBy() {
  const {
    sortBy,
    sortById,
    setSortById,
    isSortByReversed,
    setIsSortByReversed,
  } = useSavedDreamsStore();
  const updateDreams = useUpdateDreams();
  return (
    <>
      <Button
        onClick={() => {
          setIsSortByReversed(!isSortByReversed);
          updateDreams();
        }}
      >
        {isSortByReversed ? 'reversed' : 'not reversed'}
      </Button>
      {sortBy.map(({ name, value }, id) => {
        return (
          <Button
            key={value}
            disabled={id === sortById}
            onClick={() => {
              setSortById(id);
              updateDreams();
            }}
          >
            <h1>{name}</h1>
          </Button>
        );
      })}
    </>
  );
}
