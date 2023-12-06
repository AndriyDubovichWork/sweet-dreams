'use client';

import { postDream } from '../../../../api/requests';
import Input from '../../../Shared/Input/Input';

import StatusMessage from '@/app/HOCs/Shared/StatusMessage/StatusMessage';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';
import { useNewDreamStore } from '@/app/store/dream/new/useNewDreamStore';
import stringDateFormater from '@/app/utils/dream/Shared/stringDateFormater';
import createFullName from '@/app/utils/dream/new/createFullName';
import Button from '../../../Shared/Button/Button';
import Preview from '../Preview/Preview';
import RecordAudio from '../RecordAudio/RecordAudio';

function UploadAudio() {
  const { blob, name, setName, date, setDate } = useNewDreamStore();
  const updateDreams = useUpdateDreams();
  const { setStatus, status } = useLoadingStateStore();
  const isStatusOk = !status || status === 'fullfiled';
  const isButtonDisabled = !blob || !isStatusOk;
  return (
    <StatusMessage>
      <RecordAudio />
      <Input
        type='date'
        value={stringDateFormater(date, 'yyyy-mm-dd')}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Preview />
      <Button
        disabled={isButtonDisabled}
        onClick={() => {
          setStatus('pending');
          postDream(blob as Blob, createFullName(name, date)).then(() =>
            updateDreams()
          );
        }}>
        save
      </Button>
    </StatusMessage>
  );
}

export default UploadAudio;
