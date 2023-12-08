import { useSavedDreamsStore } from '@/app/features/dreams/store/dream/list/useSavedDreamsStore';
import Button from '../../../Shared/Button/Button';
import useUpdateDreams from '@/app/features/dreams/hooks/dream/useUpdateDreams';

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
          updateDreams({ isReversed: !isSortByReversed });
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
              updateDreams({ id });
            }}>
            <h1>{name}</h1>
          </Button>
        );
      })}
    </>
  );
}
