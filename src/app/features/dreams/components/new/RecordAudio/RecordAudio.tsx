import { AudioRecorder } from 'react-audio-voice-recorder';
import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import style from './RecordAudio.module.scss';
import Input from '../../shared/Input/Input';
import useStylesProvider from '../../../hooks/useStylesProvider';
import { useEffect } from 'react';
import { useWakeLock } from 'react-screen-wake-lock';

function RecordAudio() {
  const { setBlob } = useNewDreamStore();
  const { recordAudio } = useStylesProvider();

  const { request, release, isSupported } = useWakeLock();

  useEffect(() => {
    if (isSupported) {
      request('screen');
      return () => {
        void release();
      };
    }
  }, [isSupported, request, release]);

  return (
    <div
      className={style.recordAudio}
      style={recordAudio as React.CSSProperties}
    >
      <div>
        <AudioRecorder
          onRecordingComplete={(blob) => setBlob(blob)}
          classes={{
            AudioRecorderClass: style.recorderStyles,
            AudioRecorderStartSaveClass: style.recorderIcon,
            AudioRecorderPauseResumeClass: style.recorderIcon,
            AudioRecorderDiscardClass: style.recorderIcon,
            AudioRecorderTimerClass: style.timerStyles,
            AudioRecorderStatusClass: style.statusStyles,
          }}
        />
      </div>
      <Input
        accept='audio/mpeg'
        type='file'
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file?.type === 'audio-generator/mpeg') {
            setBlob(file);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}

export default RecordAudio;
