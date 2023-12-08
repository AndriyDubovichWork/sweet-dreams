import Processing from '@/app/HOCs/Shared/Processing/Processing';
import EditAudio from '@/app/components/dream/list/EditAudio/EditAudio';
import { File } from '@/app/types/store/savedDreamsStore';
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
