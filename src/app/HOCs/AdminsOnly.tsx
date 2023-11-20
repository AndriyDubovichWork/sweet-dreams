'use client';

import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import Spinner from '../components/OutPuts/Spinner/Spinner';
import Centered from '../components/OutPuts/Centered/Centered';

export default function AdminsOnly({ children }: { children: ReactNode }) {
  const { data: session }: { data: any } = useSession();
  switch (session?.user?.role) {
    case 'admin':
      return <main>{children}</main>;

    case 'user':
      return 'acess denied';
    default:
      return (
        <Centered>
          <Spinner size={90} />
        </Centered>
      );
  }
}
