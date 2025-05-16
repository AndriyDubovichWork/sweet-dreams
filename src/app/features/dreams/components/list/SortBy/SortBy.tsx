import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSavedDreamsStore } from '../../../store/list/useSavedDreamsStore';
import { AiOutlineSync } from 'react-icons/ai';
import style from './SortBy.module.scss';
import Button from '../../shared/Button/Button';

export default function SortBy() {
  const {
    sortBy,
    sortById,
    setSortById,
    isSortByReversed,
    setIsSortByReversed,
  } = useSavedDreamsStore();
  const updateDreams = useUpdateDreams();
  return (
    <div className={style.sortBy}>
      <Button
        onClick={() => {
          setIsSortByReversed(!isSortByReversed);
          updateDreams({ isReversed: !isSortByReversed });
        }}
        style={{ backgroundColor: isSortByReversed ? '#6c6c6c' : '#ffffff' }}
      >
        <AiOutlineSync color={isSortByReversed ? '#5979a6' : '#1e293b'} />

        {/* {isSortByReversed ? 'reversed' : 'not reversed'} */}
      </Button>
      {sortBy.map(({ name, value }, id) => {
        return (
          <Button
            key={value}
            disabled={id === sortById}
            onClick={() => {
              setSortById(id);
              updateDreams({ id });
            }}
          >
            <h1>{name}</h1>
          </Button>
        );
      })}
    </div>
  );
}
