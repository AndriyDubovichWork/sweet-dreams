import { getDreams } from '@/app/api/requests';
import { useLoadingStateStore } from '../../store/dream/Shared/useLoadingStateStore';
import { useSavedDreamsStore } from '../../store/dream/list/useSavedDreamsStore';
import { useSearchStore } from '../../store/dream/list/useSearchStore';
import { useNewDreamStore } from '../../store/dream/new/useNewDreamStore';
import { UpdateDreams } from '../../types/hooks/dream/UpdateDreams';

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
      setStatus('fullfiled');
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
