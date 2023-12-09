import { ReactNode } from 'react';
import style from './StatusMessage.module.scss';

import { IoMdClose } from 'react-icons/io';
import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';
import Button from '@/app/components/Button/Button';

export default function StatusMessage({ children }: { children: ReactNode }) {
  const { status, setStatus, message } = useLoadingStateStore();
  switch (status) {
    case '':
    case 'pending':
      return children;
    case 'fulfilled':
    case 'error':
      return (
        <>
          {message && (
            <div className={`${style.statusMessage} ${style[status]}`}>
              <p className={style.message}>{message}</p>
              <Button onClick={() => setStatus('')}>
                <IoMdClose />
              </Button>
            </div>
          )}
          {children}
        </>
      );
  }
}
