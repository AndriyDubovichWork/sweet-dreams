'use client';

import React, { useEffect } from 'react';
import Audio from './Audio/Audio';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import style from './AudiosList.module.scss';
import Spinner from '@/app/components/Shared/Spinner/Spinner';

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
        <table className={style.table}>
          {files.map((file, id) => {
            return <Audio file={file} id={id} key={file.id} />;
          })}
        </table>
      );
  }
}

export default AudiosList;
