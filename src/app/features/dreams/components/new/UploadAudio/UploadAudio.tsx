'use client';

import Preview from '../Preview/Preview';
import RecordAudio from '../RecordAudio/RecordAudio';
import { postDream } from '@/app/api/requests';
import createFullName from '../../../utils/new/createFullName';
import style from './UploadAudio.module.scss';
import StatusMessage from '../../../HOCs/StatusMessage/StatusMessage';
import Input from '../../shared/Input/Input';
import stringDateFormatter from '../../../utils/Shared/stringDateFormatter';
import useUploadAudioData from './../../../hooks/useUploadAudioData';
import Button from '../../shared/Button/Button';

function UploadAudio() {
  const {
    blob,
    name,
    setName,
    date,
    setDate,
    isPrivate,
    setIsPrivate,
    updateDreams,
    setStatus,
    setMessage,
    isButtonDisabled,
  } = useUploadAudioData();
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

          <Button
              isPrimary
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
          </Button>
        </div>
      </div>
    </StatusMessage>
  );
}

export default UploadAudio;
