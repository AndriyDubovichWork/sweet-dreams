'use client';

import React, { useEffect } from 'react';
import Audio from './Audio/Audio';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import style from './AudiosList.module.scss';
import Spinner from '@/app/components/Shared/Spinner/Spinner';
import { loadingStatus } from '@/app/enums/loadingStatus';
import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();

  const updateDream = useUpdateDreams();
  useEffect(() => {
    updateDream();
  }, []);
  switch (status) {
    case loadingStatus.pending:
      return <Spinner size={90} />;
    case loadingStatus.fullfiled:
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
