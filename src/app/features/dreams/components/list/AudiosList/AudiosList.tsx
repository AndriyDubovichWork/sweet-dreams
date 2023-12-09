'use client';

import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';
import { useSavedDreamsStore } from '../../../store/list/useSavedDreamsStore';
import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';
import Spinner from '@/app/components/Spinner/Spinner';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();

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
