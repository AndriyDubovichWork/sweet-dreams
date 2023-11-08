'use client';

import ApproveAction from './components/Forms/ApproveAction/ApproveAction';
import AudiosList from './components/Forms/AudiosList/AudiosList';
import Button from './components/Inputs/Button/Button';
import UploadAudio from './components/Forms/UploadAudio/UploadAudio';
import style from './home.module.scss';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className={style.home}>
      {session?.user?.email === 'andriydubovichwork@gmail.com' && <></>}
    </main>
  );
}
