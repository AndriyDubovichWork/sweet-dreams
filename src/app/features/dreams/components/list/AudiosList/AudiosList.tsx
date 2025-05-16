'use client';

import Spinner from '@/app/components/Spinner/Spinner';
import { useLoadingStateStore } from '@/app/features/dreams/store/shared/useLoadingStateStore';
import { useEffect } from 'react';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSavedDreamsStore } from '../../../store/list/useSavedDreamsStore';
import Audio from './Audio/Audio';
import style from './AudiosList.module.scss';
import { useTheme } from '@/app/HOCs/ThemeProvider/ThemeProvider';
import { useSession } from 'next-auth/react';
import NoFilesFound from '../NoFilesFound/NoFilesFound';

function AudiosList() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();
  const updateDreams = useUpdateDreams();

  const { data: session }: { data: any } = useSession();

  const { theme, themeName, toggleTheme } = useTheme();

  useEffect(() => {
    if (!files.length && status === '') {
      updateDreams();
    }
  }, []);
  switch (status) {
    case 'pending':
      return <Spinner size={90} />;
    case 'error':
      if (files.length === 0) {
        return <NoFilesFound />;
      }
      break;
    case 'fulfilled':
    case '':
      return (
        <table className={style.table}>
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
