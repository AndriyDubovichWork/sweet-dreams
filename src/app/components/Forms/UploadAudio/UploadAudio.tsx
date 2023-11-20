'use client';

import React from 'react';

import { postDream } from '../../../api/requests';
import Input from '../../Inputs/Input/Input';

import Button from '../../Inputs/Button/Button';
import Preview from '../Preview/Preview';
import RecordAudio from '../../Inputs/RecordAudio/RecordAudio';
import createFullName from '@/app/lib/createFullName';
import { useNewDreamStore } from '@/app/store/useNewDreamStore';
import { useSavedDreamsStore } from '@/app/store/useSavedDreamsStore';
import { useSearchStore } from '@/app/store/useSearchStore';
import useUpdateDreams from '@/app/hooks/useUpdateDreams';

function UploadAudio() {
  const { blob, setBlob, name, setName, date, setDate } = useNewDreamStore();

  const { search } = useSearchStore();
  const updateDreams = useUpdateDreams();

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
          postDream(blob as Blob, createFullName(name, date)).then(
            updateDreams
          );
        }}
      >
        save
      </Button>
    </div>
  );
}

export default UploadAudio;
