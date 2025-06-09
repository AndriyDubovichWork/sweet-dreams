import Processing from '@/app/features/dreams/HOCs/Processing/Processing';
import EditAudio from '../../EditAudio/EditAudio';
import style from './Audio.module.scss';
import { AudioProps } from '@/app/features/dreams/types/components/list/Audio';
import { useSession } from 'next-auth/react';
import { IoMdDownload } from 'react-icons/io';
import ButtonIcon from '../../../shared/ButtonIcon/ButtonIcon';
import useStylesProvider from '@/app/features/dreams/hooks/useStylesProvider';
import { useState } from 'react';

function Audio({ file, id }: AudioProps) {
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
          <EditAudio file={file} id={id} />
          <td>
            <a
              href={file.webContentLink}
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
