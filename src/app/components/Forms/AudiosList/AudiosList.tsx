'use client';

import { getDreams } from '@/app/api/requests';
import React, { useEffect } from 'react';
import style from './AudiosList.module.scss';
import Audio from './Audio/Audio';
import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import SortBy from '../../Inputs/SortBy/SortBy';
import SearchDream from '../SearchDream/SearchDream';
import { useSearchStore } from '@/app/store/useSearchStore';

function AudiosList() {
  const { files, setFiles, sortBy, sortById, isSortByReversed } =
    useSavedDreamsStore();
  const { search } = useSearchStore();
  useEffect(() => {
    getDreams(sortBy[sortById].value, isSortByReversed, search).then(
      ({ files }) => {
        setFiles(files);
      }
    );
  }, []);
  return (
    <div>
      <SearchDream />
      <SortBy />
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
