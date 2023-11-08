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
      {files.length > 0 ? (
        <>
          {files.map(({ name, size, id, webContentLink }) => {
            return (
              <div key={id}>
                <audio
                  controls
                  src={webContentLink.replace('&export=download', '')}
                />

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
        </>
      ) : (
        <h1>empty</h1>
      )}
    </div>
  );
}

export default AudiosList;
