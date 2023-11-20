import React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import Input from '../Input/Input';
import { useNewDreamStore } from '@/app/store/useNewDreamStore';

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
          if (file?.type === 'audio/mpeg') setBlob(file);
        }}
      />
    </div>
  );
}

export default RecordAudio;
