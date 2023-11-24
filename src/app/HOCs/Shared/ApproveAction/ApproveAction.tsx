import React, { ReactNode } from 'react';
import style from './ApproveAction.module.scss';
import Button from '../../../components/Shared/Button/Button';

import { useApproveAcrtionStore } from '@/app/store/dream/useApproveAcrtionStore';

function ApproveAction({ children }: { children: ReactNode }) {
  const { approve, setApprove, approveCallback } = useApproveAcrtionStore();
  return (
    <>
      {approve && (
        <div className={style.approveAction}>
          <p>{approve}</p>
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
