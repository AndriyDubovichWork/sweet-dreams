'use client';

import { useSession } from 'next-auth/react';
import './fonts.scss';
import style from './home.module.scss';
import useStylesProvider from './common/hooks/useStylesProvider';

export default function Home() {
  const { data: session }: { data: any } = useSession();
  const styles = useStylesProvider();

  return (
    <main className={style.home} style={styles.mainPage}>
      {session?.user?.role}
    </main>
  );
}
