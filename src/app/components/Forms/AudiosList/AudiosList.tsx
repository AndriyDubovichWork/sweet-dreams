'use client';

import { deleteDream, getDreams } from '@/app/api/requests';
import { useStore } from '@/app/store';
import React, { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './AudiosList.module.scss';
import { filesize } from 'filesize';

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
          {files.map(({ name, size, id, webContentLink, deleting }, idx) => {
            return (
              <div key={id}>
                <audio controls src={webContentLink} />

                <p>{name}</p>
                <p>{filesize(size)}</p>
                <AiOutlineDelete
                  className={style.trashIcon}
                  size={30}
                  onClick={() => {
                    if (deleting) {
                      return;
                    }
                    setApprove({
                      approve: 'are you shure you want to delete',
                      approveCallback: () => {
                        deleteDream(id).then(() => {
                          getDreams().then(({ files }) => {
                            setFiles(files);
                          });
                        });
                        setFiles([
                          ...files.map((file, localIdx) =>
                            localIdx === idx
                              ? { ...file, deleting: true }
                              : file
                          ),
                        ]);
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
