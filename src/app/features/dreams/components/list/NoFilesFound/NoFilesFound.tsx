import React from 'react';
import style from './NoFilesFound.module.scss';

export default function NoFilesFound() {
  return (
    <div className={style.noFilesFound}>
      <h1 className={style.text}>no files found</h1>
    </div>
  );
}
