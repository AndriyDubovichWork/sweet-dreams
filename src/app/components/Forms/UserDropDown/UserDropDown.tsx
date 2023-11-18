import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import style from './UserDropDown.module.scss';
import Button from '../../Inputs/Button/Button';
import { FaUser } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import Spinner from '../../OutPuts/Spinner/Spinner';
import DropDown from '../../OutPuts/DropDown/DropDown';

export default function UserDropDown() {
  const { data: session, status } = useSession();
  switch (status) {
    case 'authenticated':
      return (
        <DropDown
          thumbnail={
            <img
              className={style.userImg}
              src={session?.user?.image || 'img'}
              alt={session?.user?.name || 'name'}
            />
          }
          content={<Button onClick={() => signOut()}>log out</Button>}
        />
      );
    case 'unauthenticated':
      return <Button onClick={() => signIn()}>login</Button>;

    case 'loading':
      return <Spinner className={style.userImg} />;
  }
}
