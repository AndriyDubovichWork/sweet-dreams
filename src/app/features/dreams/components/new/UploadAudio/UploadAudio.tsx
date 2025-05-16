'use client';

import { useLoadingStateStore } from '@/app/features/dreams/store/shared/useLoadingStateStore';
import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import Preview from '../Preview/Preview';
import RecordAudio from '../RecordAudio/RecordAudio';
import { postDream } from '@/app/api/requests';
import StatusMessage from '@/app/HOCs/StatusMessage/StatusMessage';
import Input from '@/app/components/Input/Input';
import stringDateFormatter from '@/app/utils/stringDateFormatter';
import createFullName from '../../../utils/new/createFullName';
import style from './UploadAudio.module.scss';
import BeautifulButton from '@/app/components/BeautifulButton/BeautifulButton';

function UploadAudio() {
  const { blob, name, setName, date, setDate, isPrivate, setIsPrivate } =
    useNewDreamStore();
  const updateDreams = useUpdateDreams();
  const { setStatus, setMessage, status } = useLoadingStateStore();

  const isStatusOk = !status || status === 'fulfilled';
  const isButtonDisabled = !blob || !isStatusOk;

  return (
    <StatusMessage>
      <div className={style.content}>
        <div className={style.uploadAudio}>
          <RecordAudio />

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='name'
          />
          <div className={style.dateIsPrivate}>
            <Input
              type='date'
              value={stringDateFormatter(date, 'yyyy-mm-dd')}
              onChange={(e) => setDate(e.target.value)}
            />
            <label className={style.checkBox}>
              <Input
                type='checkbox'
                onChange={(e) => setIsPrivate(!isPrivate)}
              />
              <h3>is Private</h3>
            </label>
          </div>

          <Preview />

          <BeautifulButton
            disabled={isButtonDisabled}
            onClick={() => {
              setStatus('pending');
              postDream(blob as Blob, createFullName(name, date, isPrivate))
                .then(() =>
                  updateDreams({
                    successfullyMessage: 'saved successfully',
                  })
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
          </BeautifulButton>
        </div>
      </div>
    </StatusMessage>
  );
}

export default UploadAudio;
