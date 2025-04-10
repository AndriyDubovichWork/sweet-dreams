import AcessControll from '@/app/HOCs/AcessControll/AcessControll';
import UploadAudio from '@/app/features/dreams/components/new/UploadAudio/UploadAudio';

export default function NewDream() {
  return (
    <AcessControll isAdminOnly>
      <UploadAudio />
    </AcessControll>
  );
}
