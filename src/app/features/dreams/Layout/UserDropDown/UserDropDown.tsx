import { signIn, signOut, useSession } from 'next-auth/react';
import style from './UserDropDown.module.scss';
import DropDown from '../../components/shared/DropDown/DropDown';
import Button from '../../components/shared/Button/Button';
import Spinner from '../../components/shared/Spinner/Spinner';

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
          content={
            <div
              onClick={() => signOut()}
              style={{ zIndex: 10 }}
              className={style.dropDown}
            >
              log out
            </div>
          }
        />
      );
    case 'unauthenticated':
      return <Button onClick={() => signIn()}>login</Button>;

    case 'loading':
      return <Spinner className={style.userImg} />;
  }
}
