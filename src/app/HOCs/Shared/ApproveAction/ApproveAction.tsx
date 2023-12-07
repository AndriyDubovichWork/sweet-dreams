import { ReactNode } from 'react';
import Button from '../../../components/Shared/Button/Button';
import style from './ApproveAction.module.scss';

import Input from '@/app/components/Shared/Input/Input';
import { useApproveActionStore } from '@/app/store/dream/Shared/useApproveActionStore';
import { useDeleteFileStore } from '@/app/store/dream/list/useDeleteFileStore';
import Centered from '../Centered/Centered';

function ApproveAction({ children }: { children: ReactNode }) {
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
