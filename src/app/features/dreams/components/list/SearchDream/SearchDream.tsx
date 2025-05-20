import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSearchStore } from '../../../store/list/useSearchStore';
import Button from '../../shared/Button/Button';
import InputWithIcon from '../../shared/InputWithIcon/InputWithIcon';
import style from './SearchDream.module.scss';
import { RxCross2 } from 'react-icons/rx';

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
      <Button isPrimary onClick={() => updateDreams()} disabled={!search}>
        search
      </Button>
    </div>
  );
}
