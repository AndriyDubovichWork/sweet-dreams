import AdminsOnly from '@/app/HOCs/Shared/AdminsOnly/AdminsOnly';
import UploadAudio from '@/app/components/dream/new/UploadAudio/UploadAudio';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function NewDream() {
  return (
    <AdminsOnly>
      <UploadAudio />
    </AdminsOnly>
  );
}
