'use client';

import React, { useEffect } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { getDreams, postDream } from '../../api/requests';
import Input from '../Input/Input';
import { useStore } from '../../store';
import Button from '../Button/Button';

function UploadAudio() {
  const { blob, setBlob, name, setName, setFiles } = useStore();

  return (
    <div>
      <div>
        <AudioRecorder onRecordingComplete={(blob) => setBlob(blob)} />
        <input
          type='file'
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setBlob(file);
            }
          }}
        />
      </div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button
        disabled={!blob}
        onClick={() => {
          postDream(blob as Blob);
          getDreams().then(({ files }) => {
            setFiles(files);
          });
        }}
      >
        save
      </Button>
    </div>
  );
}

export default UploadAudio;
