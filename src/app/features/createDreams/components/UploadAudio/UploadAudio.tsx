'use client';

import Preview from '../Preview/Preview';
import RecordAudio from '../RecordAudio/RecordAudio';
import { postDream } from '@/app/api/requests';
import style from './UploadAudio.module.scss';
import Button from '@/app/common/components/ui/Button/Button';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import useUploadAudioData from '../../hooks/useUploadAudioData';
import StatusMessage from '@/app/common/hocs/StatusMessage/StatusMessage';
import Input from '@/app/common/components/ui/Input/Input';
import stringDateFormatter from '@/app/common/utils/stringDateFormatter';
import createFullName from '../../utils/createFullName';

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

  const styles = useStylesProvider();
  return (
    <StatusMessage>
      <div className={style.content} style={styles.uploadAudio}>
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
              <h3 style={{ color: styles.header.color }}>is Private</h3>
            </label>
          </div>

          <Preview />

          <Button
            isPrimary
            disabled={isButtonDisabled}
            onClick={() => {
              setStatus('pending');
              postDream(blob as Blob, createFullName(name, date), isPrivate)
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
