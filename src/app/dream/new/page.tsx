import AdminsOnly from '@/app/HOCs/AdminsOnly/AdminsOnly';
import UploadAudio from '@/app/features/dreams/components/new/UploadAudio/UploadAudio';

export default function NewDream() {
  return (
    <AdminsOnly>
      <UploadAudio />
    </AdminsOnly>
  );
}
