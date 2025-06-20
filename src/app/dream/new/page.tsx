'use client';

import AcessControll from '@/app/common/hocs/AcessControll/AcessControll';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import UploadAudio from '@/app/features/createDreams/components/UploadAudio/UploadAudio';

export default function NewDream() {
  const styles = useStylesProvider();

  return (
    <main style={styles.mainPage}>
      <AcessControll isAdminOnly>
        <UploadAudio />
      </AcessControll>
    </main>
  );
}
