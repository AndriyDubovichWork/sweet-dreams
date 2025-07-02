import { useEffect } from 'react';
import { useSavedDreamsStore } from '../store/useSavedDreamsStore';
import { useLoadingStateStore } from '../../../common/store/useLoadingStateStore';
import useUpdateDreams from '../../../common/hooks/useUpdateDreams';
import { useSession } from 'next-auth/react';

export default function useAudiosListData() {
  const { files } = useSavedDreamsStore();
  const { status } = useLoadingStateStore();
  const updateDreams = useUpdateDreams();

  const { data: session }: { data: any } = useSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!files.length && status === '') {
      updateDreams();
    }
  }, []);

  return { session, updateDreams, status, files };
}
