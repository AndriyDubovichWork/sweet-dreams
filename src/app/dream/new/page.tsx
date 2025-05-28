'use client';

import UploadAudio from '@/app/features/dreams/components/new/UploadAudio/UploadAudio';
import AcessControll from '@/app/features/dreams/HOCs/AcessControll/AcessControll';
import useStylesProvider from "@/app/features/dreams/hooks/useStylesProvider";

export default function NewDream() {
    const styles = useStylesProvider();

    return (
    <main  style={styles.mainPage }>
      <AcessControll isAdminOnly>
        <UploadAudio />
      </AcessControll>
    </main>
  );
}
