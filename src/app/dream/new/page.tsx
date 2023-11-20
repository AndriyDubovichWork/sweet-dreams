import AdminsOnly from '@/app/HOCs/AdminsOnly';
import UploadAudio from '@/app/components/Forms/UploadAudio/UploadAudio';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function NewDream() {
  return (
    <AdminsOnly>
      <UploadAudio />
    </AdminsOnly>
  );
}
