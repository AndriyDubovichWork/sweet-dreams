'use client';

import AcessControll from '@/app/common/hocs/AcessControll/AcessControll';
import StatusMessage from '@/app/common/hocs/StatusMessage/StatusMessage';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import AudiosList from '@/app/features/listDreams/components/AudiosList/AudiosList';
import SearchDream from '@/app/features/listDreams/components/SearchDream/SearchDream';
import SortBy from '@/app/features/listDreams/components/SortBy/SortBy';

export default function DreamsList() {
  const styles = useStylesProvider();

  return (
    <main style={styles.mainPage}>
      <AcessControll IsregisteredUsersAllowed isAdminOnly>
        <StatusMessage>
          <div style={styles.dreamsList}>
            <SearchDream />
            <SortBy />
          </div>
          <AudiosList />
        </StatusMessage>
      </AcessControll>
    </main>
  );
}
