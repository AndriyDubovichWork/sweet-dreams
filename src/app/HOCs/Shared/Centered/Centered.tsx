import React, { ReactNode } from 'react';
import style from './Centered.module.scss';

export default function Centered({ children }: { children: ReactNode }) {
  return <div className={style.centered}>{children}</div>;
}
