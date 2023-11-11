'use client';

import React, { useEffect } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { getDreams, postDream } from '../../../api/requests';
import Input from '../../Inputs/Input/Input';
import { useStore } from '../../../store';
import Button from '../../Inputs/Button/Button';
import Preview from '../Preview/Preview';
import RecordAudio from '../../Inputs/RecordAudio/RecordAudio';
import createFullName from '@/app/lib/createFullName';

function UploadAudio() {
  const { blob, setBlob, name, setName, setFiles, date, setDate } = useStore();

  return (
    <div>
      <RecordAudio />
      <Input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Preview />
      <Button
        disabled={!blob}
        onClick={() => {
          postDream(blob as Blob, createFullName(name, date)).then(() => {
            getDreams().then(({ files }) => {
              setFiles(files);
            });
          });
          setBlob(null);
          setName('');
        }}
      >
        save
      </Button>
    </div>
  );
}

export default UploadAudio;
