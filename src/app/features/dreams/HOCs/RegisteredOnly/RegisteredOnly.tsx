'use client';

import { useSession } from 'next-auth/react';
import Centered from '../Centered/Centered';
import { RegisteredOnlyProps } from '@/app/features/dreams/types/HOCs/RegisteredOnly';
import AccessDenied from '../../components/shared/AccessDenied/AccessDenied';

export default function RegisteredOnly({ children }: RegisteredOnlyProps) {
  const { data: session }: { data: any } = useSession();
  const allowed = ['user', 'superUser'];
  if (allowed.includes(session?.user?.role)) {
    return children;
  } else {
    return (
      <Centered>
        <AccessDenied />
      </Centered>
    );
  }
}
