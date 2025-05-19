import React from 'react';
import style from './NoFilesFound.module.scss';
import Centered from '../../../HOCs/Centered/Centered';

export default function NoFilesFound() {
  return (
    <Centered>
      <h1 className={style.text}>no files found</h1>
    </Centered>
  );
}
