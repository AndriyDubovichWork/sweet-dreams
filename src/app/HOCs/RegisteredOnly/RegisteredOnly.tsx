'use client';

import AccessDenied from '@/app/components/AccessDenied/AccessDenied';
import Spinner from '@/app/components/Spinner/Spinner';
import { UserRights } from '@/app/types/Shared/session';
import { useSession } from 'next-auth/react';
import Centered from '../Centered/Centered';
import { RegisteredOnlyProps } from '@/app/types/HOCs/RegisteredOnly';
import { useEffect, useState } from 'react';

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
