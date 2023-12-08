import AdminsOnly from '@/app/features/dreams/HOCs/Shared/AdminsOnly/AdminsOnly';
import UploadAudio from '@/app/features/dreams/components/dream/new/UploadAudio/UploadAudio';

export default function NewDream() {
  return (
    <AdminsOnly>
      <UploadAudio />
    </AdminsOnly>
  );
}
