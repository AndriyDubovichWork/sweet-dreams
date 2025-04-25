import { AudioRecorder } from 'react-audio-voice-recorder';
import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import Input from '@/app/components/Input/Input';
import style from './RecordAudio.module.scss';
import { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

function RecordAudio() {
  const { setBlob } = useNewDreamStore();
  const [option, setOption] = useState('');
  return (
    <div className={style.recordAudio}>
      {option === 'recorder' || !option ? (
        <div
          onClick={() => {
            setOption('recorder');
          }}
          className={style.recorderContainer}
        >
          <AudioRecorder onRecordingComplete={(blob) => setBlob(blob)} />
        </div>
      ) : (
        ''
      )}
      {option === 'file' || !option ? (
        <Input
          accept='audio/mpeg'
          type='file'
          onClick={() => {
            setOption('file');
          }}
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file?.type === 'audio/mpeg') {
              setBlob(file);
              e.target.value = '';
            }
          }}
        />
      ) : (
        ''
      )}
      {option && <MdOutlineCancel onClick={() => setOption('')} size={36} />}
    </div>
  );
}

export default RecordAudio;
