import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '../../Shared/Button/Button';
import DropDown from '../../Shared/DropDown/DropDown';
import Spinner from '../../Shared/Spinner/Spinner';
import style from './UserDropDown.module.scss';

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
