import { getDreams } from '@/app/api/requests';
import { useNewDreamStore } from '../../features/createDreams/store/useNewDreamStore';
import { useSavedDreamsStore } from '../../features/listDreams/store/useSavedDreamsStore';
import { useSearchStore } from '../../features/listDreams/store/useSearchStore';
import { useLoadingStateStore } from '@/app/common/store/useLoadingStateStore';
import { UpdateDreams } from './types/UpdateDreams';

function useUpdateDreams() {
  const { setBlob, setName } = useNewDreamStore();
  const {
    setFiles,
    sortBy,
    sortById,
    isSortByReversed,
    nextPageToken,
    setNextPageToken,
  } = useSavedDreamsStore();
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
      NoSearch ? '' : search,
      nextPageToken
    ).then((files: any) => {
      setNextPageToken(nextPageToken);

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
