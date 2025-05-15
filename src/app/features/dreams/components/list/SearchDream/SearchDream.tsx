import Input from '@/app/components/Input/Input';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSearchStore } from '../../../store/list/useSearchStore';
import Button from '@/app/components/Button/Button';
import style from './SearchDream.module.scss';

export default function SearchDream() {
  const { search, setSearch } = useSearchStore();
  const updateDreams = useUpdateDreams();

  return (
    <div className={style.searchDream}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='dream name'
      />
      <Button onClick={() => updateDreams()} disabled={!search}>
        search
      </Button>
    </div>
  );
}
