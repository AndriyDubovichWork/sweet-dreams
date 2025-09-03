'use client';

import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';
import NoFilesFound from '../NoFilesFound/NoFilesFound';
import SkeletonLoading from './SkeletonLoading/SkeletonLoading';
import Paginator from '../Paginator/Paginator';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import useAudiosListData from '../../hooks/useAudiosListData';
import { usePaginatorStore } from '@/app/common/hooks/usePaginatorStore';
import { useEffect } from 'react';

function AudiosList() {
  const { session, status, files } = useAudiosListData();
  const styles = useStylesProvider();
  const { offset, pageSize, setTotalItems } = usePaginatorStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setTotalItems(files.length);
  }, []);

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
              if (renderId >= offset() && renderId < offset() + pageSize)
                return (
                  <Audio
                    file={{ ...file, processing: false }}
                    renderId={renderId}
                    key={file.id}
                  />
                );
            })}
          </table>
          <Paginator />
        </>
      );
  }
}

export default AudiosList;
