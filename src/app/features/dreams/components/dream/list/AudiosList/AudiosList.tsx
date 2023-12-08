'use client';

import { useLoadingStateStore } from '@/app/features/dreams/store/dream/Shared/useLoadingStateStore';
import { useSavedDreamsStore } from '@/app/features/dreams/store/dream/list/useSavedDreamsStore';
import Spinner from '../../../Shared/Spinner/Spinner';
import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();

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
