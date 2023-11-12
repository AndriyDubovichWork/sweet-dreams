'use client';

import { getDreams } from '@/app/api/requests';
import { useStore } from '@/app/store';
import React, { useEffect, useState } from 'react';
import style from './AudiosList.module.scss';
import Audio from './Audio/Audio';
import EditableAudio from './EditableAudio/EditableAudio';

function AudiosList() {
  const { files, setFiles, setEditable } = useStore();

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
            if (file.editable) {
              return (
                <EditableAudio
                  file={file}
                  key={file.id}
                  close={() => setEditable(id, false, files)}
                />
              );
            } else {
              return (
                <Audio
                  file={file}
                  id={id}
                  key={file.id}
                  edit={() => setEditable(id, true, files)}
                />
              );
            }
          })}
        </>
      ) : (
        <h1>empty</h1>
      )}
    </div>
  );
}

export default AudiosList;
