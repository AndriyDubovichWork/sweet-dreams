'use client';

import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Button from '../Button/Button';
import style from './Header.module.scss';
import Link from 'next/link';
import UserDropDown from '../../user/UserDropDown/UserDropDown';

export default function Header() {
  return (
    <header className={style.header}>
      <UserDropDown />
      <Link href={'/dream/new'}>new</Link>
      <Link href={'/dream/list'}>list</Link>
    </header>
  );
}
