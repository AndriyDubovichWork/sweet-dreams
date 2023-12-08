import Processing from '@/app/features/dreams/HOCs/Shared/Processing/Processing';
import { File } from '@/app/features/dreams/types/store/savedDreamsStore';
import EditAudio from '../../EditAudio/EditAudio';
import style from './Audio.module.scss';

function Audio({ file, id }: { file: File; id: number }) {
  return (
    <Processing isProcessing={file.processing}>
      <tr className={file.processing ? style.processing : ''}>
        <td>
          <audio controls src={file.webContentLink} />
        </td>
        <EditAudio file={file} id={id} />
      </tr>
    </Processing>
  );
}

export default Audio;
