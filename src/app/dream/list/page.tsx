'use client';

import AdminsOnly from '@/app/features/dreams/HOCs/Shared/AdminsOnly/AdminsOnly';
import StatusMessage from '@/app/features/dreams/HOCs/Shared/StatusMessage/StatusMessage';
import AudiosList from '@/app/features/dreams/components/dream/list/AudiosList/AudiosList';
import SearchDream from '@/app/features/dreams/components/dream/list/SearchDream/SearchDream';
import SortBy from '@/app/features/dreams/components/dream/list/SortBy/SortBy';
import useUpdateDreams from '@/app/features/dreams/hooks/dream/useUpdateDreams';
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
