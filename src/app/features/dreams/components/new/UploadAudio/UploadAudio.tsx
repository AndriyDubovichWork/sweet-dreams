'use client';

import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import Preview from '../Preview/Preview';
import RecordAudio from '../RecordAudio/RecordAudio';
import { postDream } from '@/app/api/requests';
import StatusMessage from '@/app/HOCs/StatusMessage/StatusMessage';
import Input from '@/app/components/Input/Input';
import stringDateFormatter from '@/app/utils/stringDateFormatter';
import Button from '@/app/components/Button/Button';
import createFullName from '../../../utils/new/createFullName';

function UploadAudio() {
  const { blob, name, setName, date, setDate } = useNewDreamStore();
  const updateDreams = useUpdateDreams();
  const { setStatus, setMessage, status } = useLoadingStateStore();

  const isStatusOk = !status || status === 'fulfilled';
  const isButtonDisabled = !blob || !isStatusOk;
  return (
    <StatusMessage>
      <RecordAudio />
      <Input
        type='date'
        value={stringDateFormatter(date, 'yyyy-mm-dd')}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Preview />
      <Button
        disabled={isButtonDisabled}
        onClick={() => {
          setStatus('pending');
          postDream(blob as Blob, createFullName(name, date))
            .then(() =>
              updateDreams({ successfullyMessage: 'saved successfully' })
            )
            .catch((e: Error) => {
              setStatus('error');
              setMessage("couldn't upload dream");
              setTimeout(() => {
                setStatus('');
                setMessage('');
              }, 6_000);
            });
        }}
      >
        save
      </Button>
    </StatusMessage>
  );
}

export default UploadAudio;
