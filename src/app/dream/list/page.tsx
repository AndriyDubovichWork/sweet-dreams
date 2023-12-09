'use client';

import AdminsOnly from '@/app/HOCs/AdminsOnly/AdminsOnly';
import StatusMessage from '@/app/HOCs/StatusMessage/StatusMessage';
import AudiosList from '@/app/features/dreams/components/list/AudiosList/AudiosList';
import SearchDream from '@/app/features/dreams/components/list/SearchDream/SearchDream';
import SortBy from '@/app/features/dreams/components/list/SortBy/SortBy';
import Link from 'next/link';

export default function DreamsList() {
  return (
    <AdminsOnly>
      <StatusMessage>
        <Link href='/dream/new'>new</Link>
        <SearchDream />
        <SortBy />
        <AudiosList />
      </StatusMessage>
    </AdminsOnly>
  );
}
