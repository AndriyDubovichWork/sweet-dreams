'use client';

import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Button from '../Button/Button';
import style from './Header.module.scss';
import Link from 'next/link';
import UserDropDown from '../../user/UserDropDown/UserDropDown';
import { useLoadingStateStore } from '@/app/store/dream/Shared/useLoadingStateStore';

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
