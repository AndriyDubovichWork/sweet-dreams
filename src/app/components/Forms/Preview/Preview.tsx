import createFullName from '@/app/lib/createFullName';
import { useStore } from '@/app/store';
import React from 'react';

export default function Preview() {
  const { blob, name, date } = useStore();

  return (
    <>
      <h1>preview:</h1>
      <h3>{createFullName(name, date)}</h3>
      {blob && <audio controls src={URL.createObjectURL(blob as Blob)} />}
    </>
  );
}
