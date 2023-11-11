'use client';

import { deleteDream, getDreams } from '@/app/api/requests';
import { useStore } from '@/app/store';
import React, { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './AudiosList.module.scss';
import { filesize } from 'filesize';
import Audio from './Audio/Audio';

function AudiosList() {
  const { files, setFiles } = useStore();

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
