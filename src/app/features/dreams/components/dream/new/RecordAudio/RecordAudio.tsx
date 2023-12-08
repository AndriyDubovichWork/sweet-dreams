import { useNewDreamStore } from '@/app/features/dreams/store/dream/new/useNewDreamStore';
import { AudioRecorder } from 'react-audio-voice-recorder';
import Input from '../../../Shared/Input/Input';

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
