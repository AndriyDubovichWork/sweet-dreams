import Button from '@/app/components/Button/Button';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSavedDreamsStore } from '../../../store/list/useSavedDreamsStore';

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
    <div>
      <Button
        onClick={() => {
          setIsSortByReversed(!isSortByReversed);
          updateDreams({ isReversed: !isSortByReversed });
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
