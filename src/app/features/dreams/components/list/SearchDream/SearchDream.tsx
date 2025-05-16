import Input from '@/app/components/Input/Input';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSearchStore } from '../../../store/list/useSearchStore';
import Button from '@/app/components/Button/Button';
import style from './SearchDream.module.scss';
import { RxCross2 } from 'react-icons/rx';
import InputWithIcon from '@/app/components/InputWithIcon/InputWithIcon';

export default function SearchDream() {
  const { search, setSearch } = useSearchStore();
  const updateDreams = useUpdateDreams();

  return (
    <div className={style.searchDream}>
      <InputWithIcon
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='dream name'
      >
        {search && (
          <RxCross2
            onClick={() => {
              setSearch('');
              updateDreams({ NoSearch: true });
            }}
          />
        )}
      </InputWithIcon>
      <Button onClick={() => updateDreams()} disabled={!search}>
        search
      </Button>
    </div>
  );
}
