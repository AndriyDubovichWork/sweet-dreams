import { ReactNode } from 'react';
import style from './ApproveAction.module.scss';

import Centered from '../Centered/Centered';
import { useDeleteFileStore } from '@/app/features/listDreams/store/useDeleteFileStore';
import { ApproveActionProps } from '@/app/common/hocs/types/ApproveAction';
import Input from '../../components/ui/Input/Input';
import Button from '@/app/common/components/ui/Button/Button';
import { useApproveActionStore } from '@/app/common/hooks/useApproveActionStore';
import useStylesProvider from '../../hooks/useStylesProvider';
import { RxCross1 } from 'react-icons/rx';

function ApproveAction({ children }: ApproveActionProps) {
  const { approve, type, approveCallback, resetApprove } =
    useApproveActionStore();
  const { deletingFileName, localName, setLocalName } = useDeleteFileStore();
  const { approveAction } = useStylesProvider();
  return (
    <>
      {approve && (
        <Centered styles={approveAction.container} absolute content>
          <RxCross1
            size={24}
            style={approveAction.cross}
            onClick={() => {
              resetApprove();
              setLocalName('');
            }}
          />
          <p>{approve}</p>
          {type === 'deletion' && (
            <Input
              onChange={(e) => setLocalName(e.target.value)}
              value={localName}
            />
          )}
          <div>
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
          </div>
        </Centered>
      )}
      {children}
    </>
  );
}

export default ApproveAction;
