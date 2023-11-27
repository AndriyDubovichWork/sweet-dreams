'use client';

import style from './home.module.scss';
import './animations.scss';
import { useSession } from 'next-auth/react';
import Centered from './HOCs/Shared/Centered/Centered';

export default function Home() {
  const { data: session }: { data: any } = useSession();

  return (
    <main className={style.home}>
      {session?.user?.role === 'admin' ? <>admin</> : 'user'}
    </main>
  );
}
