import Processing from '@/app/common/hocs/Processing/Processing';
import EditAudio from '../../EditAudio/EditAudio';
import style from './Audio.module.scss';
import type { AudioProps } from '@/app/features/listDreams/components/types/Audio';
import { useSession } from 'next-auth/react';
import { IoMdDownload } from 'react-icons/io';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';
import ButtonIcon from '@/app/common/components/ui/ButtonIcon/ButtonIcon';

function Audio({ file, renderId }: AudioProps) {
  const isPrivate = file.name.includes('/private/');

  const { data: session }: { data: any } = useSession();

  const styles = useStylesProvider();
  if (
    !isPrivate ||
    session?.user?.role === 'admin' ||
    session?.user?.role === 'superUser'
  )
    return (
      <Processing isProcessing={file.processing}>
        <tr
          style={
            isPrivate
              ? styles.audioListElement.private
              : styles.audioListElement.regular
          }
          className={file.processing ? style.processing : style.row}
        >
          <EditAudio file={file} renderId={renderId} />
          <td>
            <a
              href={file.webcontentlink}
              target='_blank'
              className={style.downloadLink}
            >
              <ButtonIcon>
                <IoMdDownload size={36} />
              </ButtonIcon>
            </a>
          </td>
        </tr>
      </Processing>
    );
}

export default Audio;
