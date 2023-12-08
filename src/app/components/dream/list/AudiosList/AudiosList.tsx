'use client';

import Spinner from '@/app/components/Shared/Spinner/Spinner';
import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
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
