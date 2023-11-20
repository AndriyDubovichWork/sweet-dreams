'use client';

import React, { useEffect } from 'react';
import Audio from './Audio/Audio';
import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import SearchDream from '../SearchDream/SearchDream';
import Spinner from '../../OutPuts/Spinner/Spinner';
import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';
import useUpdateDreams from '@/app/hooks/useUpdateDreams';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status, setStatus } = useLoadingStateStore();
  const updateDream = useUpdateDreams();
  useEffect(() => {
    updateDream();
  }, []);
  switch (status) {
    case 'pending':
      return <Spinner size={90} />;
    case 'fullfiled':
      return (
        <>
          {files.map((file, id) => {
            return <Audio file={file} id={id} key={file.id} />;
          })}
        </>
      );
  }
}

export default AudiosList;
