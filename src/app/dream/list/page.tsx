'use client';

import AudiosList from '@/app/features/dreams/components/list/AudiosList/AudiosList';
import SearchDream from '@/app/features/dreams/components/list/SearchDream/SearchDream';
import SortBy from '@/app/features/dreams/components/list/SortBy/SortBy';
import AcessControll from '@/app/features/dreams/HOCs/AcessControll/AcessControll';
import StatusMessage from '@/app/features/dreams/HOCs/StatusMessage/StatusMessage';
import useStylesProvider from "@/app/features/dreams/hooks/useStylesProvider";

export default function DreamsList() {
const styles = useStylesProvider()

  return (
    <main>
      <AcessControll IsregisteredUsersAllowed isAdminOnly>
        <StatusMessage>
          <div
            style={styles.dreamsList}
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
