import React from 'react';
import style from './Paginator.module.scss';
import useUpdateDreams from '../../../hooks/useUpdateDreams';

export default function Paginator() {
  const updateDreams = useUpdateDreams();

  return (
    <div className={style.paginator} onClick={() => updateDreams()}>
      next page
    </div>
  );
}
