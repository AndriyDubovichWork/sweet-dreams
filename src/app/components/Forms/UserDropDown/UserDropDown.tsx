import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import style from './UserDropDown.module.scss';
import Button from '../../Inputs/Button/Button';
import { FaUser } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';

export default function UserDropDown() {
  const { data: session, status } = useSession();
  switch (status) {
    case 'authenticated':
      return (
        <>
          <img
            className={style.userImg}
            src={session?.user?.image || 'img'}
            alt={session?.user?.name || 'name'}
          />
          <Button onClick={() => signOut()}>log out</Button>
        </>
      );
    case 'unauthenticated':
      return (
        <>
          <FaUser className={style.userImg} />
          <Button onClick={() => signIn()}>login</Button>
        </>
      );

    case 'loading':
      return (
        <AiOutlineLoading className={`${style.loading} ${style.userImg}`} />
      );
  }
}
