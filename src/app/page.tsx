'use client';

import ApproveAction from './components/ApproveAction/ApproveAction';
import AudiosList from './components/AudiosList/AudiosList';
import Button from './components/Button/Button';
import UploadAudio from './components/UploadAudio/UploadAudio';
import style from './home.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineUserAdd } from 'react-icons/ai';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className={style.home}>
      {session ? (
        <>
          <img
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
      {session?.user?.email === 'andriydubovichwork@gmail.com' && (
        <>
          <UploadAudio />
          <AudiosList />
        </>
      )}
    </main>
  );
}
