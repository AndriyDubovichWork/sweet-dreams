'use client';

import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import Spinner from '../../../components/Shared/Spinner/Spinner';
import Centered from '../Centered/Centered';
import AcessDenied from '../../../components/Shared/AcessDenied/AcessDenied';

export default function AdminsOnly({ children }: { children: ReactNode }) {
  const { data: session }: { data: any } = useSession();
  switch (session?.user?.role) {
    case 'admin':
      return <main>{children}</main>;

    case 'user':
      return (
        <Centered>
          <AcessDenied />
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
