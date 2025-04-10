'use client';

import AccessDenied from '@/app/components/AccessDenied/AccessDenied';
import Spinner from '@/app/components/Spinner/Spinner';
import { UserRights } from '@/app/types/Shared/session';
import { useSession } from 'next-auth/react';
import Centered from '../Centered/Centered';
import { RegisteredOnlyProps } from '@/app/types/HOCs/RegisteredOnly';
import { getUsers } from '@/app/api/requests';
import { useEffect, useState } from 'react';

export default function RegisteredOnly({ children }: RegisteredOnlyProps) {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, []);

  const { data: session }: { data: any } = useSession();

  if (users?.includes(session?.user?.email)) {
    return children;
  } else {
    return (
      <Centered>
        <AccessDenied />
      </Centered>
    );
  }
}
