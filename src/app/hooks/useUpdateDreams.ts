import React from 'react';
import { useSearchStore } from '../store/useSearchStore';
import { useSavedDreamsStore } from '../store/useSavedDreamsStore';
import { useNewDreamStore } from '../store/useNewDreamStore';
import { getDreams } from '../api/requests';
import { useLoadingStateStore } from '../store/useLoadingStateStore';

function useUpdateDreams() {
  const { setBlob, setName } = useNewDreamStore();
  const { setFiles, sortBy, sortById, isSortByReversed } =
    useSavedDreamsStore();
  const { search } = useSearchStore();

  const { setStatus } = useLoadingStateStore();

  function updateDreams(id?: number, isReversed?: boolean) {
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
    });
  }

  return updateDreams;
}

export default useUpdateDreams;
