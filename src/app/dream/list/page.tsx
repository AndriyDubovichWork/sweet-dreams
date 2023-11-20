'use client';

import AdminsOnly from '@/app/HOCs/AdminsOnly';
import AudiosList from '@/app/components/Forms/AudiosList/AudiosList';
import SearchDream from '@/app/components/Forms/SearchDream/SearchDream';
import SortBy from '@/app/components/Inputs/SortBy/SortBy';
import Link from 'next/link';
import React from 'react';

export default function DreamsList() {
  return (
    <AdminsOnly>
      <Link href='/dream/new'>new</Link>
      <SearchDream />
      <SortBy />
      <AudiosList />
    </AdminsOnly>
  );
}
