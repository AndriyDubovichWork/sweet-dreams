import { ReactNode } from 'react';
import style from './ApproveAction.module.scss';

import Centered from '../Centered/Centered';
import { useDeleteFileStore } from '@/app/features/listDreams/store/useDeleteFileStore';
import { ApproveActionProps } from '@/app/common/hocs/types/ApproveAction';
import Input from '../../components/ui/Input/Input';
import Button from '@/app/common/components/ui/Button/Button';
import { useApproveActionStore } from '@/app/common/hooks/useApproveActionStore';

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
