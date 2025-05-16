import { ReactNode } from 'react';
import style from './ApproveAction.module.scss';

import Centered from '../Centered/Centered';
import { useApproveActionStore } from '@/app/features/dreams/store/shared/useApproveActionStore';
import { useDeleteFileStore } from '@/app/features/dreams/store/list/useDeleteFileStore';
import { ApproveActionProps } from '@/app/features/dreams/types/HOCs/ApproveAction';
import Input from '../../components/shared/Input/Input';
import Button from '../../components/shared/Button/Button';

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
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              resetApprove();
              setLocalName('');
            }}
          >
            No
          </Button>
        </Centered>
      )}
      {children}
    </>
  );
}

export default ApproveAction;
