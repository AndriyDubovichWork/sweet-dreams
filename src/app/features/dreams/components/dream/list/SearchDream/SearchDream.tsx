import { useSearchStore } from '@/app/features/dreams/store/dream/list/useSearchStore';
import Button from '../../../Shared/Button/Button';
import Input from '../../../Shared/Input/Input';
import useUpdateDreams from '@/app/features/dreams/hooks/dream/useUpdateDreams';

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
