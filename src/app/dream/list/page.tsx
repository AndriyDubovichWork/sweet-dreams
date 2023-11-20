'use client';

import AudiosList from '@/app/components/Forms/AudiosList/AudiosList';
import SearchDream from '@/app/components/Forms/SearchDream/SearchDream';
import SortBy from '@/app/components/Inputs/SortBy/SortBy';
import Link from 'next/link';
import React from 'react';

export default function DreamList() {
  return (
    <main>
      <Link href='/dream/new'>new</Link>
      <SearchDream />
      <SortBy />
      <AudiosList />
    </main>
  );
}
