'use client';

import Link from 'next/link';
import UserDropDown from './UserDropDown/UserDropDown';
import style from './Header.module.scss';
import { useSession } from 'next-auth/react';
import ThemeSlider from './ThemeSlider/ThemeSlider';
import { useLoadingStateStore } from '@/app/common/store/useLoadingStateStore';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';

export default function Header() {
  const { setStatus } = useLoadingStateStore();
  const resetStatus = () => setStatus('');

  const { data: session }: { data: any } = useSession();

  const styles = useStylesProvider();

  return (
    <header className={style.header} style={styles.header}>
      <UserDropDown />
      {session?.user?.role === 'admin' && (
        <Link href={'/dream/new'} onClick={resetStatus}>
          new
        </Link>
      )}
      <Link href={'/dream/list'} onClick={resetStatus}>
        list
      </Link>
      <ThemeSlider />
    </header>
  );
}
