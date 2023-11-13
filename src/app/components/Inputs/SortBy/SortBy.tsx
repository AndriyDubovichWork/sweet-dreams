import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import React from 'react';
import Button from '../Button/Button';
import { getDreams } from '@/app/api/requests';
import { useSearchStore } from '@/app/store/useSearchStore';

export default function SortBy() {
  const {
    setFiles,
    sortBy,
    sortById,
    setSortById,
    isSortByReversed,
    setIsSortByReversed,
  } = useSavedDreamsStore();
  const { search } = useSearchStore();
  return (
    <>
      <Button
        onClick={() => {
          setIsSortByReversed(!isSortByReversed);
          getDreams(sortBy[sortById].value, isSortByReversed, search).then(
            ({ files }) => {
              setFiles(files);
            }
          );
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
              getDreams(value, isSortByReversed, search).then(({ files }) => {
                setFiles(files);
              });
            }}
          >
            <h1>{name}</h1>
          </Button>
        );
      })}
    </>
  );
}
