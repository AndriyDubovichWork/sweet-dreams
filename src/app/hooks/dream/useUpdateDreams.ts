import React from 'react';
import { useSearchStore } from '../../store/dream/list/useSearchStore';
import { useSavedDreamsStore } from '../../store/dream/list/useSavedDreamsStore';
import { useNewDreamStore } from '../../store/dream/new/useNewDreamStore';
import { getDreams } from '../../api/requests';
import { useLoadingStateStore } from '../../store/dream/Shared/useLoadingStateStore';
import { loadingStatus } from '@/app/enums/loadingStatus';

function useUpdateDreams() {
  const { setBlob, setName } = useNewDreamStore();
  const { setFiles, sortBy, sortById, isSortByReversed } =
    useSavedDreamsStore();
  const { search } = useSearchStore();

  const { setStatus } = useLoadingStateStore();

  function updateDreams(id?: number, isReversed?: boolean) {
    setStatus(loadingStatus.pending);
    return getDreams(
      sortBy[id === undefined ? sortById : id].value,
      isReversed === undefined ? isSortByReversed : isReversed,
      search
    ).then(({ files }) => {
      setFiles(files);
      setBlob(null);
      setName('');
      setStatus(loadingStatus.fullfiled);
    });
  }

  return updateDreams;
}

export default useUpdateDreams;
