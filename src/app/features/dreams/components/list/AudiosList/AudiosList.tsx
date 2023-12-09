'use client';

import Spinner from '@/app/components/Spinner/Spinner';
import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';
import { useEffect } from 'react';
import { useSavedDreamsStore } from '../../../store/list/useSavedDreamsStore';
import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';
import useUpdateDreams from '../../../hooks/useUpdateDreams';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();
  const updateDreams = useUpdateDreams();

  useEffect(() => {
    if (!files.length) {
      updateDreams();
    }
  }, []);
  switch (status) {
    case 'pending':
      return <Spinner size={90} />;
    case 'fulfilled':
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
