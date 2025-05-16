import { getDreams } from '@/app/api/requests';
import { useNewDreamStore } from '../store/new/useNewDreamStore';
import { useSavedDreamsStore } from '../store/list/useSavedDreamsStore';
import { useSearchStore } from '../store/list/useSearchStore';
import { useLoadingStateStore } from '@/app/features/dreams/store/shared/useLoadingStateStore';
import { UpdateDreams } from '../types/hooks/UpdateDreams';

function useUpdateDreams() {
  const { setBlob, setName } = useNewDreamStore();
  const { setFiles, sortBy, sortById, isSortByReversed } =
    useSavedDreamsStore();
  const { search } = useSearchStore();

  const { setStatus, setMessage } = useLoadingStateStore();

  function updateDreams({
    id,
    isReversed,
    successfullyMessage,
    NoSearch = false,
  }: UpdateDreams = {}) {
    setStatus('pending');

    return getDreams(
      sortBy[id === undefined ? sortById : id].value,
      isReversed === undefined ? isSortByReversed : isReversed,
      NoSearch ? '' : search
    ).then(({ files }) => {
      console.log(NoSearch ? '' : search);

      setFiles(files);
      setBlob(null);
      setName('');
      setStatus('fulfilled');
      successfullyMessage && setMessage(successfullyMessage);

      if (files.length === 0) {
        setStatus('error');
      }

      setTimeout(() => {
        setStatus('');
        setMessage('');
        if (files.length === 0) {
          setStatus('error');
        }
      }, 6_000);
    });
  }

  return updateDreams;
}

export default useUpdateDreams;
