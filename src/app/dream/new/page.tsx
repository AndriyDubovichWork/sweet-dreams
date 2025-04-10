import AcessControll from '@/app/HOCs/AcessControll/AcessControll';
import UploadAudio from '@/app/features/dreams/components/new/UploadAudio/UploadAudio';

export default function NewDream() {
  return (
    <main>
      <AcessControll isAdminOnly>
        <UploadAudio />
      </AcessControll>
    </main>
  );
}
