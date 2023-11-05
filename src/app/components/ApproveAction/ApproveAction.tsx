import React, { ReactNode } from 'react';
import style from './ApproveAction.module.scss';
import Button from '../Button/Button';
import { useStore } from '@/app/store';

function ApproveAction({ children }: { children: ReactNode }) {
  const { approve, setApprove, approveCallback } = useStore();
  return (
    <>
      {approve && (
        <div className={style.approveAction}>
          {approve}
          <Button
            onClick={() => {
              approveCallback();

              setApprove({ approve: null, approveCallback: () => {} });
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() =>
              setApprove({ approve: null, approveCallback: () => {} })
            }
          >
            No
          </Button>
        </div>
      )}
      {children}
    </>
  );
}

export default ApproveAction;
