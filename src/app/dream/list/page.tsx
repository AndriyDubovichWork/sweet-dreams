'use client';

import AdminsOnly from '@/app/HOCs/AdminsOnly/AdminsOnly';
import StatusMessage from '@/app/HOCs/StatusMessage/StatusMessage';
import AudiosList from '@/app/features/dreams/components/list/AudiosList/AudiosList';
import SearchDream from '@/app/features/dreams/components/list/SearchDream/SearchDream';
import SortBy from '@/app/features/dreams/components/list/SortBy/SortBy';
import useUpdateDreams from '@/app/features/dreams/hooks/useUpdateDreams';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DreamsList() {
  const updateDream = useUpdateDreams();

  useEffect(() => {
    updateDream();
  }, []);
  return (
    <AdminsOnly>
      <StatusMessage>
        <Link href='/dream/new'>new</Link>
        <SearchDream />
        <SortBy />
        <AudiosList />
      </StatusMessage>
    </AdminsOnly>
  );
}
