import EditAudio from '../../EditAudio/EditAudio';
import style from './Audio.module.scss';
import Processing from '@/app/HOCs/Processing/Processing';
import { AudioProps } from '@/app/features/dreams/types/components/list/Audio';
import { IoMdCloudDownload } from 'react-icons/io';

function Audio({ file, id }: AudioProps) {
  return (
    <Processing isProcessing={file.processing}>
      <tr className={file.processing ? style.processing : ''}>
        {/* <td>
          <audio controls>
            <source src={file.webContentLink} />
          </audio>
        </td> */}

        <EditAudio file={file} id={id} />
        <td>
          <a href={file.webContentLink} target='_blank'>
            <IoMdCloudDownload size={36} />
          </a>
        </td>
      </tr>
    </Processing>
  );
}

export default Audio;
