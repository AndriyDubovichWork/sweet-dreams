'use client';

import { postDream } from '../../requests';
import style from './home.module.scss';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main className={style.home}>
      {session ? (
        <>
          <img
            src={session?.user?.image || 'img'}
            alt={session?.user?.name || 'name'}
          />
          <h1 onClick={() => signOut()}>log out</h1>
        </>
      ) : (
        <h1 onClick={() => signIn()}>login</h1>
      )}
      <input
        type='file'
        onChange={async (e) => console.log(await postDream(e.target.value))}
      />
    </main>
  );
}
