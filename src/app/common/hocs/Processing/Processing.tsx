import { processingProps } from '@/app/common/hocs/types/Processing';
import loadingSvg from './loading.svg';
import Centered from '../Centered/Centered';

function Processing({ isProcessing, children }: processingProps) {
  if (!isProcessing) return children;

  return (
    <Centered>
      {children}
      <img src={loadingSvg.src} />
    </Centered>
  );
}

export default Processing;
