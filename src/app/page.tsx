'use client';

import { useSession } from 'next-auth/react';
import style from './home.module.scss';

export default function Home() {
  const { data: session }: { data: any } = useSession();

  return <main className={style.home}>{session?.user?.role}</main>;
}
