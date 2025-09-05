// biome-ignore assist/source/organizeImports: <just types>
import type { processingProps } from '@/app/common/hocs/types/Processing';
import loadingSvg from './loading.svg';
import Centered from '../Centered/Centered';
import Image from 'next/image';

function Processing({ isProcessing, children }: processingProps) {
  if (!isProcessing) return children;

  return (
    <Centered>
      {children}
      <Image width='50' height='50' src={loadingSvg.src} alt='spiner' />
    </Centered>
  );
}

export default Processing;
