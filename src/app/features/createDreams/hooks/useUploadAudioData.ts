import React from 'react';
import { useNewDreamStore } from '../store/useNewDreamStore';
import useUpdateDreams from '../../../common/hooks/useUpdateDreams';
import { useLoadingStateStore } from '../../../common/store/useLoadingStateStore';

export default function useUploadAudioData() {
  const { blob, name, setName, date, setDate, isPrivate, setIsPrivate } =
    useNewDreamStore();
  const updateDreams = useUpdateDreams();
  const { setStatus, setMessage, status } = useLoadingStateStore();

  const isStatusOk = !status || status === 'fulfilled';
  const isButtonDisabled = !blob || !isStatusOk;

  return {
    blob,
    name,
    setName,
    date,
    setDate,
    isPrivate,
    setIsPrivate,
    updateDreams,
    setStatus,
    setMessage,
    status,
    isButtonDisabled,
    isStatusOk,
  };
}
