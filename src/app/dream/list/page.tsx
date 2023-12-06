'use client';

import AdminsOnly from '@/app/HOCs/Shared/AdminsOnly/AdminsOnly';
import AudiosList from '@/app/components/dream/list/AudiosList/AudiosList';
import SearchDream from '@/app/components/dream/list/SearchDream/SearchDream';
import SortBy from '@/app/components/dream/list/SortBy/SortBy';
import Link from 'next/link';

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
