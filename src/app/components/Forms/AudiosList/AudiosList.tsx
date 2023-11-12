'use client';

import { getDreams } from '@/app/api/requests';
import React, { useEffect } from 'react';
import style from './AudiosList.module.scss';
import Audio from './Audio/Audio';
import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';

function AudiosList() {
  const { files, setFiles } = useSavedDreamsStore();

  useEffect(() => {
    getDreams().then(({ files }) => {
      setFiles(files);
    });
  }, []);
  return (
    <div>
      {files.length > 0 ? (
        <>
          {files.map((file, id) => {
            return <Audio file={file} id={id} key={file.id} />;
          })}
        </>
      ) : (
        <h1>empty</h1>
      )}
    </div>
  );
}

export default AudiosList;
