'use client';

import Spinner from '@/app/components/Shared/Spinner/Spinner';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import { useEffect } from 'react';
import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();

  const updateDream = useUpdateDreams();
  useEffect(() => {
    updateDream();
  }, []);
  switch (status) {
    case 'pending':
      return <Spinner size={90} />;
    case 'fullfiled':
    case '':
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
