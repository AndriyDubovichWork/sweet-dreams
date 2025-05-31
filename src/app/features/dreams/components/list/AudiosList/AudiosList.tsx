'use client';

import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';
import NoFilesFound from '../NoFilesFound/NoFilesFound';
import Spinner from '../../shared/Spinner/Spinner';
import useAudiosListData from '../../../hooks/useAudiosListData';
import useStylesProvider from '@/app/features/dreams/hooks/useStylesProvider';
import Centered from '@/app/features/dreams/HOCs/Centered/Centered';
import SkeletonLoading from './SkeletonLoading/SkeletonLoading';

function AudiosList() {
  const { session, status, files } = useAudiosListData();
  const styles = useStylesProvider();
  switch (status) {
    case 'pending':
      return <SkeletonLoading role={session?.user?.role} />;

    case 'error':
      if (files.length === 0) {
        return <NoFilesFound />;
      }
      break;
    case 'fulfilled':
    case '':
      return (
        <table className={style.table} style={styles.audioListElement.header}>
          <tr>
            <th>name</th>
            <th>file size</th>
            <th>date</th>
            {session?.user?.role === 'admin' && (
              <>
                <th className={style.minWidth}>edit</th>
                <th className={style.minWidth}>delete</th>
              </>
            )}

            <th className={style.minWidth}>download</th>
          </tr>
          {files.map((file, id) => {
            return <Audio file={file} id={id} key={file.id} />;
          })}
        </table>
      );
  }
}

export default AudiosList;
