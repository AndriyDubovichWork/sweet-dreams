'use client';

import { deleteDream, getDreams } from '@/app/api/requests';
import { useStore } from '@/app/store';
import React, { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

function AudiosList() {
  const { files, setFiles, setApprove } = useStore();

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
            <div key={id}>
              <p>{name}</p>
              <p>{size}</p>
              <AiOutlineDelete
                size={30}
                onClick={() => {
                  setApprove({
                    approve: 'are you shure you want to delete',
                    approveCallback: () => {
                      deleteDream(id).then(() => {
                        getDreams().then(({ files }) => {
                          setFiles(files);
                        });
                      });
                    },
                  });
                }}
              />
            </div>
          );
        })}
    </div>
  );
}

export default AudiosList;
