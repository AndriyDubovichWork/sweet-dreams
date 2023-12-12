import { ReactNode } from 'react';
import style from './ApproveAction.module.scss';

import Centered from '../Centered/Centered';
import { useApproveActionStore } from '@/app/store/useApproveActionStore';
import { useDeleteFileStore } from '@/app/features/dreams/store/list/useDeleteFileStore';
import Input from '@/app/components/Input/Input';
import Button from '@/app/components/Button/Button';
import { ApproveActionProps } from '@/app/types/HOCs/ApproveAction';

function ApproveAction({ children }: ApproveActionProps) {
  const { approve, type, approveCallback, resetApprove } =
    useApproveActionStore();
  const { deletingFileName, localName, setLocalName } = useDeleteFileStore();
  return (
    <>
      {approve && (
        <Centered className={style.approveAction}>
          <p>{approve}</p>
          {type === 'deletion' && (
            <Input
              onChange={(e) => setLocalName(e.target.value)}
              value={localName}
            />
          )}
          <Button
            disabled={type === 'deletion' && deletingFileName !== localName}
            onClick={() => {
              approveCallback();
              setLocalName('');
              resetApprove();
            }}>
            Yes
          </Button>
          <Button
            onClick={() => {
              resetApprove();
              setLocalName('');
            }}>
            No
          </Button>
        </Centered>
      )}
      {children}
    </>
  );
}

export default ApproveAction;
