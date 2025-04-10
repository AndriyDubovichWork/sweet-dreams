'use client';

import AcessControll from '@/app/HOCs/AcessControll/AcessControll';
import StatusMessage from '@/app/HOCs/StatusMessage/StatusMessage';
import AudiosList from '@/app/features/dreams/components/list/AudiosList/AudiosList';
import SearchDream from '@/app/features/dreams/components/list/SearchDream/SearchDream';
import SortBy from '@/app/features/dreams/components/list/SortBy/SortBy';
import Link from 'next/link';

export default function DreamsList() {
  return (
    <main>
      <AcessControll IsregisteredUsersAllowed isAdminOnly>
        <StatusMessage>
          <Link href='/dream/new'>new</Link>
          <SearchDream />
          <SortBy />
          <AudiosList />
        </StatusMessage>
      </AcessControll>
    </main>
  );
}
