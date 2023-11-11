import React from 'react';
import style from './Processing.module.scss';
import loadingSvg from './loading.svg';

type processing = { isProcessing: boolean | undefined; children: JSX.Element };

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
