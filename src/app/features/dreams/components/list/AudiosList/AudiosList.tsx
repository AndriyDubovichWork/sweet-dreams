'use client';

import Spinner from '@/app/components/Spinner/Spinner';
import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';
import { useEffect } from 'react';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSavedDreamsStore } from '../../../store/list/useSavedDreamsStore';
import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';
import { useTheme } from '@/app/HOCs/ThemeProvider/ThemeProvider';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();
  const updateDreams = useUpdateDreams();

  const { theme, themeName, toggleTheme } = useTheme();

  useEffect(() => {
    if (!files.length && status === '') {
      updateDreams();
    }
  }, []);
  switch (status) {
    case 'pending':
      return <Spinner size={90} />;
    case 'fulfilled':
    case '':
      if (files.length === 0) {
        return <>no files found</>;
      }
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
