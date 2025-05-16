import UploadAudio from '@/app/features/dreams/components/new/UploadAudio/UploadAudio';
import AcessControll from '@/app/features/dreams/HOCs/AcessControll/AcessControll';

export default function NewDream() {
  return (
    <main>
      <AcessControll isAdminOnly>
        <UploadAudio />
      </AcessControll>
    </main>
  );
}
