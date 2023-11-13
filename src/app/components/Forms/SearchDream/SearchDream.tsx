import { useSearchStore } from '@/app/store/useSearchStore';
import React from 'react';
import Input from '../../Inputs/Input/Input';
import Button from '../../Inputs/Button/Button';
import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import { getDreams } from '@/app/api/requests';

export default function SearchDream() {
  const { search, setSearch } = useSearchStore();
  const { setFiles, sortBy, sortById, isSortByReversed } =
    useSavedDreamsStore();

  return (
    <div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button
        onClick={() =>
          getDreams(sortBy[sortById].value, isSortByReversed, search).then(
            ({ files }) => setFiles(files)
          )
        }
      >
        search
      </Button>
    </div>
  );
}
