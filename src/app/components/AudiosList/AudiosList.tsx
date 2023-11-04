'use client';

import { deleteDream, getDreams } from '@/app/api/requests';
import { useStore } from '@/app/store';
import React, { useEffect } from 'react';

function AudiosList() {
  const { files, setFiles } = useStore();

  useEffect(() => {
    getDreams().then(({ files }) => {
      setFiles(files);
    });
  }, []);
  return (
    <div>
      {files.length &&
        files.map(({ name, size, id }) => {
          return (
            <div
              onClick={() => {
                deleteDream(id).then(() => {
                  getDreams().then(({ files }) => {
                    setFiles(files);
                  });
                });
              }}
            >
              <p>{name}</p>
              <p>{size}</p>
            </div>
          );
        })}
    </div>
  );
}

export default AudiosList;
