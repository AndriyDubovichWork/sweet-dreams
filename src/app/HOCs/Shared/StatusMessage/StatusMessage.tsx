import { ReactNode } from 'react';
import style from './StatusMessage.module.scss';

import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';
import { IoMdClose } from 'react-icons/io';
import Button from '@/app/components/Shared/Button/Button';

export default function StatusMessage({ children }: { children: ReactNode }) {
  const { status, setStatus, message } = useLoadingStateStore();
  switch (status) {
    case '':
    case 'pending':
      return children;
    case 'fullfiled':
    case 'error':
      return (
        <>
          <div className={`${style.statusMessage} ${style[status]}`}>
            <p className={style.message}>{message}</p>
            <Button onClick={() => setStatus('')}>
              <IoMdClose />
            </Button>
          </div>
          {children}
        </>
      );
  }
}
