'use client';

import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Button from '../components/Inputs/Button/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import style from './Header.module.scss';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className={style.header}>
      {session ? (
        <>
          <img
            className={style.userImg}
            src={session?.user?.image || 'img'}
            alt={session?.user?.name || 'name'}
          />
          <Button onClick={() => signOut()}>log out</Button>
        </>
      ) : (
        <>
          <AiOutlineUserAdd />
          <Button onClick={() => signIn()}>login</Button>
        </>
      )}
      <Link href={'/dream/new'}>new</Link>
      <Link href={'/dream/list'}>list</Link>
    </header>
  );
}
