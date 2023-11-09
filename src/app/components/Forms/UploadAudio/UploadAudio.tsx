'use client';

import React, { useEffect } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { getDreams, postDream } from '../../../api/requests';
import Input from '../../Inputs/Input/Input';
import { useStore } from '../../../store';
import Button from '../../Inputs/Button/Button';

function UploadAudio() {
  const { blob, setBlob, name, setName, setFiles, date, setDate } = useStore();
  const fullName = `${name ? name + ' ' : ''}${new Date(
    date
  ).toLocaleDateString('en-US')}`;
  return (
    <div>
      <div>
        <AudioRecorder onRecordingComplete={(blob) => setBlob(blob)} />
        <Input
          type='file'
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setBlob(file);
            }
          }}
        />
      </div>
      <Input
        type='date'
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <h1>preview:</h1>
      <h3>{fullName}</h3>
      {blob && <audio controls src={URL.createObjectURL(blob as Blob)} />}
      <Button
        disabled={!blob}
        onClick={() => {
          postDream(blob as Blob, fullName).then(() => {
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
