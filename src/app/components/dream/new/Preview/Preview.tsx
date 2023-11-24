import createFullName from '@/app/utils/createFullName';
import { useNewDreamStore } from '@/app/store/dream/useNewDreamStore';
import React from 'react';

export default function Preview() {
  const { blob, date, name } = useNewDreamStore();
  return (
    <>
      <h1>preview:</h1>
      <h3>{createFullName(name, date)}</h3>
      {blob && <audio controls src={URL.createObjectURL(blob as Blob)} />}
    </>
  );
}
