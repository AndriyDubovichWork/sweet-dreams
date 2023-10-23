'use client';

import { postDream } from './api/dream/requests';
import style from './home.module.scss';

export default function Home() {
  return (
    <main className={style.home}>
      <input
        type='file'
        onChange={async (e) => console.log(await postDream(e.target.value))}
      />
    </main>
  );
}
