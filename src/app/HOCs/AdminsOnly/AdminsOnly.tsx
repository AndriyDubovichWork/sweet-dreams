'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import Centered from '../Centered/Centered';
import { UserRights } from '@/app/types/Shared/session';
import AccessDenied from '@/app/components/AccessDenied/AccessDenied';
import Spinner from '@/app/components/Spinner/Spinner';

export default function AdminsOnly({ children }: { children: ReactNode }) {
  const { data: session }: { data: any } = useSession();
  const role: UserRights = session?.user?.role;
  switch (role) {
    case 'admin':
      return <main>{children}</main>;

    case 'user':
      return (
        <Centered>
          <AccessDenied />
        </Centered>
      );
    default:
      return (
        <Centered>
          <Spinner size={90} />
        </Centered>
      );
  }
}
