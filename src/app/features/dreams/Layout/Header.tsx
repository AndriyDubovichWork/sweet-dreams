'use client';

import Link from 'next/link';
import UserDropDown from './UserDropDown/UserDropDown';
import style from './Header.module.scss';
import { useSession } from 'next-auth/react';
import { useLoadingStateStore } from '../store/shared/useLoadingStateStore';

export default function Header() {
  const { setStatus } = useLoadingStateStore();
  const resetStatus = () => setStatus('');

  const { data: session }: { data: any } = useSession();

  return (
    <header className={style.header}>
      <UserDropDown />
      {session?.user?.role === 'admin' && (
        <Link href={'/dream/new'} onClick={resetStatus}>
          new
        </Link>
      )}
      <Link href={'/dream/list'} onClick={resetStatus}>
        list
      </Link>
    </header>
  );
}
