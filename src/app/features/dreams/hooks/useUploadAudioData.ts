import React from 'react';
import { useNewDreamStore } from '../store/new/useNewDreamStore';
import useUpdateDreams from './useUpdateDreams';
import { useLoadingStateStore } from '../store/shared/useLoadingStateStore';

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
