'use client';

import React, { useRef } from 'react';

import { postDream } from '../../../../api/requests';
import Input from '../../../Shared/Input/Input';

import Button from '../../../Shared/Button/Button';
import Preview from '../Preview/Preview';
import RecordAudio from '../RecordAudio/RecordAudio';
import createFullName from '@/app/utils/createFullName';
import { useNewDreamStore } from '@/app/store/dream/new/useNewDreamStore';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';

function UploadAudio() {
  const { blob, name, setName, date, setDate } = useNewDreamStore();
  const updateDreams = useUpdateDreams();
  const { setStatus, status } = useLoadingStateStore();

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
        disabled={!blob || status !== 'fullfiled'}
        onClick={() => {
          setStatus('pending');
          postDream(blob as Blob, createFullName(name, date)).then(() =>
            updateDreams()
          );
        }}
      >
        save
      </Button>
    </div>
  );
}

export default UploadAudio;
