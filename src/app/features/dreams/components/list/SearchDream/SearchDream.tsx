import Input from '@/app/components/Input/Input';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSearchStore } from '../../../store/list/useSearchStore';
import Button from '@/app/components/Button/Button';

export default function SearchDream() {
  const { search, setSearch } = useSearchStore();
  const updateDreams = useUpdateDreams();

  return (
    <>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={() => updateDreams()}>search</Button>
    </>
  );
}
