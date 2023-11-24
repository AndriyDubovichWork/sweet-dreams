import React from 'react';
import style from './Processing.module.scss';
import loadingSvg from './loading.svg';
import { processing } from '@/app/types/components/Shared/Processing';

function Processing({ isProcessing, children }: processing) {
  if (!isProcessing) return children;

  return (
    <div className={style.processingContainer}>
      {children}
      <img src={loadingSvg.src} className={style.processing} />
    </div>
  );
}

export default Processing;
