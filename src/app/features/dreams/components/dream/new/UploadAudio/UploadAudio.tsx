'use client';

import Input from '../../../Shared/Input/Input';

import Button from '../../../Shared/Button/Button';
import Preview from '../Preview/Preview';
import RecordAudio from '../RecordAudio/RecordAudio';
import { useNewDreamStore } from '@/app/features/dreams/store/dream/new/useNewDreamStore';
import useUpdateDreams from '@/app/features/dreams/hooks/dream/useUpdateDreams';
import { useLoadingStateStore } from '@/app/features/dreams/store/dream/Shared/useLoadingStateStore';
import stringDateFormater from '@/app/features/dreams/utils/dream/Shared/stringDateFormater';
import { postDream } from '@/app/api/requests';
import createFullName from '@/app/features/dreams/utils/dream/new/createFullName';
import StatusMessage from '@/app/features/dreams/HOCs/Shared/StatusMessage/StatusMessage';

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
        onChange={(e: any) => setDate(e.target.value)}
      />
      <Input value={name} onChange={(e: any) => setName(e.target.value)} />
      <Preview />
      <Button
        disabled={isButtonDisabled}
        onClick={() => {
          setStatus('pending');
          postDream(blob as Blob, createFullName(name, date)).then(() =>
            updateDreams({ successfullyMessage: 'saved successfully' })
          );
        }}>
        save
      </Button>
    </StatusMessage>
  );
}

export default UploadAudio;
