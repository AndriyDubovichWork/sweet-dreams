'use client';

import Link from 'next/link';
import { useLoadingStateStore } from '../store/useLoadingStateStore';
import UserDropDown from './UserDropDown/UserDropDown';
import style from './Header.module.scss';

export default function Header() {
  const { setStatus } = useLoadingStateStore();
  const resetStatus = () => setStatus('');

  return (
    <header className={style.header}>
      <UserDropDown />
      <Link href={'/dream/new'} onClick={resetStatus}>
        new
      </Link>
      <Link href={'/dream/list'} onClick={resetStatus}>
        list
      </Link>
    </header>
  );
}
