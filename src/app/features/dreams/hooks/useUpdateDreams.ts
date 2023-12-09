import { getDreams } from '@/app/api/requests';
import { useNewDreamStore } from '../store/new/useNewDreamStore';
import { useSavedDreamsStore } from '../store/list/useSavedDreamsStore';
import { useSearchStore } from '../store/list/useSearchStore';
import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';
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
  }: UpdateDreams = {}) {
    setStatus('pending');
    return getDreams(
      sortBy[id === undefined ? sortById : id].value,
      isReversed === undefined ? isSortByReversed : isReversed,
      search
    ).then(({ files }) => {
      setFiles(files);
      setBlob(null);
      setName('');
      setStatus('fulfilled');
      successfullyMessage && setMessage(successfullyMessage);

      setTimeout(() => {
        setStatus('');
        setMessage('');
      }, 6_000);
    });
  }

  return updateDreams;
}

export default useUpdateDreams;
