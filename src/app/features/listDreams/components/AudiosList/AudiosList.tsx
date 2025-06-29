'use client';

import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';
import NoFilesFound from '../NoFilesFound/NoFilesFound';
import SkeletonLoading from './SkeletonLoading/SkeletonLoading';
import Paginator from '../Paginator/Paginator';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import useAudiosListData from '../../hooks/useAudiosListData';

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
        <>
          <Paginator />

          <table className={style.table} style={styles.audioListElement.header}>
            <tr>
              <th>name</th>
              <th>audio</th>
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
            {files.map((file, renderId) => {
              return <Audio file={file} renderId={renderId} key={file.id} />
            })}
          </table>
        </>
      );
  }
}

export default AudiosList;
