'use client';

import AudiosList from '@/app/features/dreams/components/list/AudiosList/AudiosList';
import SearchDream from '@/app/features/dreams/components/list/SearchDream/SearchDream';
import SortBy from '@/app/features/dreams/components/list/SortBy/SortBy';
import AcessControll from '@/app/features/dreams/HOCs/AcessControll/AcessControll';
import StatusMessage from '@/app/features/dreams/HOCs/StatusMessage/StatusMessage';

export default function DreamsList() {
  return (
    <main>
      <AcessControll IsregisteredUsersAllowed isAdminOnly>
        <StatusMessage>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '1rem 0',
            }}
          >
            <SearchDream />
            <SortBy />
          </div>
          <AudiosList />
        </StatusMessage>
      </AcessControll>
    </main>
  );
}
