import React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { postDream } from '../api/requests';
import Input from './Input';

function UploadAudio() {
  return (
    <div>
      <AudioRecorder
        onRecordingComplete={async (blob) => {
          await postDream(blob);
        }}
      />
      <input
        type='file'
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            console.log(await postDream(file));
          }
        }}
      />
      <Input />
    </div>
  );
}

export default UploadAudio;
