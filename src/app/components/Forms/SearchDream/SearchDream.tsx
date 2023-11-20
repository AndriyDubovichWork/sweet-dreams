import { useSearchStore } from '@/app/store/useSearchStore';
import React from 'react';
import Input from '../../Inputs/Input/Input';
import Button from '../../Inputs/Button/Button';
import useUpdateDreams from '@/app/hooks/useUpdateDreams';

export default function SearchDream() {
  const { search, setSearch } = useSearchStore();
  const updateDreams = useUpdateDreams();

  return (
    <div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={updateDreams}>search</Button>
    </div>
  );
}
