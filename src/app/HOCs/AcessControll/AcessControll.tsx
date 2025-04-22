'use client';

import AccessDenied from '@/app/components/AccessDenied/AccessDenied';
import Spinner from '@/app/components/Spinner/Spinner';
import { UserRights } from '@/app/types/Shared/session';
import { useSession } from 'next-auth/react';
import Centered from '../Centered/Centered';
import { AcessControllProps } from '@/app/types/HOCs/AcessControll';
import RegisteredOnly from '../RegisteredOnly/RegisteredOnly';
import { useLoadingStateStore } from '@/app/store/useLoadingStateStore';

export default function AcessControll({
  children,
  IsregisteredUsersAllowed,
  isAdminOnly,
}: AcessControllProps) {
  const { data: session }: { data: any } = useSession();
  const role: UserRights = session?.user?.role;
  const { status } = useLoadingStateStore();

  switch (role) {
    case 'admin':
      return children;
    case 'user':
    case 'superUser':
      if (IsregisteredUsersAllowed) {
        return <RegisteredOnly>{children}</RegisteredOnly>;
      }
      if (isAdminOnly && status !== 'pending') {
        return (
          <Centered>
            <AccessDenied />
          </Centered>
        );
      } else {
        return <></>;
      }
    default:
      return (
        <Centered>
          <Spinner size={90} />
        </Centered>
      );
  }
}
