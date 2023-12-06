import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import Button from '../../../Shared/Button/Button';

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
    <>
      <Button
        onClick={() => {
          setIsSortByReversed(!isSortByReversed);
          updateDreams(undefined, !isSortByReversed);
        }}>
        {isSortByReversed ? 'reversed' : 'not reversed'}
      </Button>
      {sortBy.map(({ name, value }, id) => {
        return (
          <Button
            key={value}
            disabled={id === sortById}
            onClick={() => {
              setSortById(id);
              updateDreams(id);
            }}>
            <h1>{name}</h1>
          </Button>
        );
      })}
    </>
  );
}
