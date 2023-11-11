import React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import Input from '../Input/Input';
import { useStore } from '@/app/store';

function RecordAudio() {
  const { setBlob } = useStore();
  return (
    <div>
      <AudioRecorder onRecordingComplete={(blob) => setBlob(blob)} />
      <Input
        accept='audio/mpeg'
        type='file'
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file?.type === 'audio/mpeg') setBlob(file);
        }}
      />
    </div>
  );
}

export default RecordAudio;
