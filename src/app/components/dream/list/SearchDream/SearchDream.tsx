import { useSearchStore } from '@/app/store/dream/useSearchStore';
import React from 'react';
import Input from '../../../Shared/Input/Input';
import Button from '../../../Shared/Button/Button';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';

export default function SearchDream() {
  const { search, setSearch } = useSearchStore();
  const updateDreams = useUpdateDreams();

  return (
    <div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={() => updateDreams()}>search</Button>
    </div>
  );
}
