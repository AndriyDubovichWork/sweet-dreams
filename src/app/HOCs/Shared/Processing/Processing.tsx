import { processing } from '@/app/types/components/Shared/Processing';
import style from './Processing.module.scss';
import loadingSvg from './loading.svg';

function Processing({ isProcessing, children }: processing) {
  if (!isProcessing) return children;

  return (
    <>
      {children}
      <img src={loadingSvg.src} className={style.processing} />
    </>
  );
}

export default Processing;
