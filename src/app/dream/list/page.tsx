import AudiosList from '@/app/components/Forms/AudiosList/AudiosList';
import Link from 'next/link';
import React from 'react';

export default function DreamList() {
  return (
    <main>
      <Link href='/dream/new'>new</Link>
      <AudiosList />
    </main>
  );
}
