import { AudioRecorder } from 'react-audio-voice-recorder';
import { useNewDreamStore } from '../../../store/new/useNewDreamStore';
import Input from '@/app/components/Input/Input';

function RecordAudio() {
  const { setBlob } = useNewDreamStore();

  return (
    <div>
      <AudioRecorder onRecordingComplete={(blob) => setBlob(blob)} />
      <Input
        accept='audio/mpeg'
        type='file'
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file?.type === 'audio/mpeg') {
            setBlob(file);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}

export default RecordAudio;
