import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import React from 'react';
import Button from '../Button/Button';
import { getDreams } from '@/app/api/requests';

export default function SortBy() {
  const {
    setFiles,
    sortBy,
    sortById,
    setSortById,
    isSortByReversed,
    setIsSortByReversed,
  } = useSavedDreamsStore();

  return (
    <>
      <Button
        onClick={() => {
          setIsSortByReversed(!isSortByReversed);
          getDreams(sortBy[sortById].value, isSortByReversed).then(
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
              getDreams(value, isSortByReversed).then(({ files }) => {
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
