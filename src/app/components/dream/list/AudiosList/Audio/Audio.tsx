import { filesize } from 'filesize';
import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import style from './Audio.module.scss';
import { deleteDream, renameDream } from '@/app/api/requests';
import Button from '@/app/components/Shared/Button/Button';
import Input from '@/app/components/Shared/Input/Input';
import addProcessingProperty from '@/app/utils/addProcessingProperty';
import { useSavedDreamsStore } from '@/app/store/dream/list/useSavedDreamsStore';
import { useApproveAcrtionStore } from '@/app/store/dream/Shared/useApproveAcrtionStore';
import { useSearchStore } from '@/app/store/dream/list/useSearchStore';
import useUpdateDreams from '@/app/hooks/dream/useUpdateDreams';
import EditAudio from '@/app/components/dream/list/EditAudio/EditAudio';
import Processing from '@/app/HOCs/Shared/Processing/Processing';
import { File } from '@/app/types/store/savedDreamsStore';

function Audio({ file, id }: { file: File; id: number }) {
  const { name, id: fileId, webContentLink, processing } = file;
  const { setApprove } = useApproveAcrtionStore();

  const { files, setFiles } = useSavedDreamsStore();

  const updateDreams = useUpdateDreams();

  const deleteFile = () =>
    setApprove({
      approve: 'are you shure you want to delete ' + name,
      approveCallback: () => {
        deleteDream(fileId).then(() => {
          updateDreams();
        });
        setFiles(addProcessingProperty(files, id, true));
      },
    });

  return (
    <Processing isProcessing={file.processing}>
      <tr>
        <td>
          <audio controls src={webContentLink} />
        </td>
        <EditAudio file={file} id={id} />
        <td>
          <Button disabled={processing} onClick={deleteFile}>
            <AiOutlineDelete className={style.trashIcon} size={30} />
          </Button>
        </td>
      </tr>
    </Processing>
  );
}

export default Audio;
