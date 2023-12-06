import AdminsOnly from '@/app/HOCs/Shared/AdminsOnly/AdminsOnly';
import UploadAudio from '@/app/components/dream/new/UploadAudio/UploadAudio';

export default function NewDream() {
  return (
    <AdminsOnly>
      <UploadAudio />
    </AdminsOnly>
  );
}
