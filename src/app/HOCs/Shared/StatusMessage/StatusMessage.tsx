import React, { ReactNode } from 'react';
import style from './StatusMessage.module.scss';
import Button from '../../../components/Shared/Button/Button';

import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';

export default function StatusMessage({ children }: { children: ReactNode }) {
  const { status } = useLoadingStateStore();

  return (
    <>
      {status && (
        <div className={style.statusMessage}>
          <p>{status}</p>
        </div>
      )}
      {children}
    </>
  );
}
